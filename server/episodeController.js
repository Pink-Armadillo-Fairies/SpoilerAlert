const db = require('./db_config.js');

const episode = {
  getEpisodes: async (req, res, next) => {
    try {
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

  createEpisode: async (req, res, next) => {
    try {
      const number = req.body.number;
      const title = req.body.title;
      const seasonID = req.body.seasonID;
      const result = await db.none(
        `INSERT INTO episodes (number, title, season) VALUES ('${number}', '${title}', '${seasonID}')`
      );
      return next();
    } catch (err) {
      const errObj = {
        log: `create episode failed: ${err}`,
        message: { err: 'create episode failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  saveView: async (req, res, next) => {
    try {
      console.log(req.body)
      const sampleRequest = {
        username: "surferdude99",
        show: "Bridgerton",
        season: "2",
        episode: "8",
        message: "No way, why'd they kill her?",
        watchParty: {}

      }
      const result = await db.any(`SELECT 
        users.username as user,
        shows.title as show,
        seasons.number as season,
        episodes.number as episode,
        episodes.title as title
        
        FROM users 
        INNER JOIN views ON users.id=views.user
        INNER JOIN episodes ON views.episode=episodes.id
        INNER JOIN seasons ON episodes.season=seasons.id
        INNER JOIN shows ON seasons.show=shows.id`)
        console.log(result)
        res.locals.watchParty = result
      return next();
    } catch (err) {
      const errObj = {
        log: `create episode failed: ${err}`,
        message: { err: 'create episode failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  
};

module.exports = episode;
