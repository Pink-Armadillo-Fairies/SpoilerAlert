const db = require('./db_config.js');

const season = {
  getSeasons: async (req, res, next) => {
    try {
      const result = await db.any('select * from "seasons"');
      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `get seasons failed: ${err}`,
        message: { err: 'get seasons failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  createSeason: async (req, res, next) => {
      try {
        // TO-DO: update search to be the value we receive from the search input
        const tvMazeId = res.locals.show.id;

        // fetching the seasons based on tvMazeId
        const response = await fetch(`https://api.tvmaze.com/shows/${tvMazeId}/seasons`);
  
        let data = await response.json();

        // getting the primary key id from shows table based on finding a match for tvMazeId
        let showId = await db.any(`SELECT id FROM shows WHERE tvmaze_id = '${tvMazeId}'`);
       
        
        res.locals.seasons = data;

        // Loop through seasons, create a row for each one
        
        for (const season of data) {

          // console.log(`season.number: `, season.number,`showId: `, showId[0].id);

          const result = await db.none(
            `INSERT INTO seasons (number, show) VALUES ('${season.number}', '${showId[0].id}' )`
          );
        }
        console.log("hitting next in createSeason");
        next();      
  
      } catch (err) {
        const errObj = {
          log: `create season failed: ${err}`,
          message: { err: 'search show failed, check server log for details' },
        };
        return next(errObj);
      }
    }
  };

module.exports = season;
