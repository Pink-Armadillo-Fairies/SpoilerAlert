const db = require('./db_config.js');
const { escape } = require('sqlstring');

const episode = {
  getEpisodes: async (req, res, next) => {
    try {

      if (res.locals.isShowInDB !== null) {
        console.log('episodes in db')
        return next();
      };


      const result = await db.any('select * from "episodes"');
      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `get episodes failed: ${err}`,
        message: { err: 'get episodes failed, check server log for details' },
      };
      return next(errObj);
    }
  },


  // TO-DO : improve performance so we insert all rows at once instead of in a for loop
  
  createEpisodes: async (req, res, next) => {
      try {

        if (res.locals.isShowInDB !== null) {
          console.log('episodes in db')
          return next();
        };

        // TO-DO: update search to be the value we receive from the search input
        const tvMazeId = res.locals.show.id;
  
        // fetching the seasons based on tvMazeId
        const response = await fetch(`https://api.tvmaze.com/shows/${tvMazeId}/episodes`);

        console.log("createEpsiodes API worked")
  
        let data = await response.json();
  
        let showId = await db.any(`SELECT id FROM shows WHERE tvmaze_id = '${tvMazeId}'`);

        console.log(`showId: `, showId);
        
        
        

        //console.log(`seasons: `, seasons)
        
        res.locals.episodes = data;
        
        for (const episode of data) {

          //gets season id for current episode in loop if episode number is 1 to limit db calls
          if (episode.number == 1) {

            let seasonId = await db.one(
              `SELECT s.id
              FROM seasons s
              JOIN shows sh ON s.show = sh.id
              WHERE sh.id= ${showId[0].id} AND s.number = ${episode.season}`);

          };
          //console.log(`seasonid: `, seasonId);
  
          //console.log(`episode.name: `, episode.name,`episode.number: `, episode.number);
          
  
          //inserts episode into episode table with correct season id
          const result = await db.none(
            `INSERT INTO episodes (episode_name, episode_number, season_id) VALUES ($1, $2, $3)`,
            [episode.name, episode.number, seasonId.id]
          );
        }
      
        next();      
  
      } catch (err) {
        const errObj = {
          log: `create episodes failed: ${err}`,
          message: { err: 'create episodes failed, check server log for details' },
        };
        return next(errObj);
      }
    },

  saveView: async (req, res, next) => {
    try {
      // const sampleRequest = {
      //   username: 'surferdude99',
      //   show: 'Bridgerton',
      //   season: 2,
      //   episode: 8,
      //   message: "No way, why'd they kill her?",
      //   watchParty: {},
      // };

      // get userID
      const user = await db.any(
        `SELECT * FROM users WHERE "username"='${req.body.username}'`
      );
      const userID = user[0].id;

      // search all episodes and extract episode ID
      const allEpisodesQuery = `SELECT
      shows.title as show_title,
      seasons.number as season,
      episodes.number as episode,
      episodes.id as id

      FROM episodes
      INNER JOIN seasons ON episodes.season=seasons.id
      INNER JOIN shows on seasons.show=shows.id`;
      const allEpisodes = await db.any(allEpisodesQuery);
      console.log(req.body);
      const episodeID = allEpisodes.find(
        (ep) =>
          ep.show_title == req.body.show &&
          ep.season == req.body.season &&
          ep.episode == req.body.episode
      ).id;

      // escape message string for sql
      const escapedString = escape(req.body.message);

      // create new message with user id episode id and message body
      const insertViewMessage = `INSERT INTO views ("user", episode, message) VALUES ($1, $2, $3);`;
      await db.none(insertViewMessage, [userID, episodeID, escapedString]);

      // return resulting views
      const result = await db.any(`SELECT
        users.username as user,
        shows.title as show,
        seasons.number as season,
        episodes.number as episode,
        episodes.title as title,
        views.message as message
        
        FROM users 

        INNER JOIN views ON users.id=views.user
        INNER JOIN episodes ON views.episode=episodes.id
        INNER JOIN seasons ON episodes.season=seasons.id
        INNER JOIN shows ON seasons.show=shows.id`);
      res.locals.watchParty = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `save view failed: ${err}`,
        message: { err: 'save view failed, check server log for details' },
      };
      return next(errObj);
    }
  },
};

module.exports = episode;
