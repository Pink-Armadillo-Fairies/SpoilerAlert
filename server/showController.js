const db = require('./db_config.js');

// middleware to get shows a user has been using / watching
// this will be used to populate the user's dashboardf





const show = {
  getShows: async (req, res, next) => {
    try {
      console.log('get show is hit')
      const result = await db.any('select * from "shows"');

      if (!result || result.length === 0) {
        return next({
          log: 'getShows function: No shows found in the database',
          status: 404,
          message: { err: 'No shows available, from getShows function' }
        });
      }

      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `get shows failed: ${err}`,
        message: { err: 'get shows failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  getUserSavedShows: async (req, res, next) => {
    try {
      const username = req.params.username; // get username from request
  
      if (!username) {
        return next({
          log: 'from the getUserSavedShows function: No username was provided',
          status: 400,
          message: { err: 'No username provided using getUserSavedShows' },
        });
      }

      // get user id with username
      const  userQuery = `
      SELECT id FROM users WHERE username = $1
      `;
          
      const userIdResult = await db.oneOrNone(userQuery, [username]);

      if (!userIdResult) {
        return next({
          log: 'from getUserSavedShows function: No user found',
          status: 404,
          message: { err: 'No user found when querying db with user name'}
        })
      }

      const userId = userIdResult.id;
  
      const showsQuery = `
        SELECT DISTINCT s.id, s.title, s.created_at
        FROM shows s
        INNER JOIN user_shows us ON s.id = us.show_id
        WHERE us.user_id = $1
      `;
  
      const result = await db.any(query, [userId]); // input username and query to get shows
      
      if(!result || result.length === 0) {
        return next({
          log: 'from the getUserSavedShows function: No shows found in the database',
          status: 404,
          message: { err: 'No shows found using getUserSavedShows' },
        });
      }
  
      res.locals.savedShows = result;
      return next();
    } catch (err) {
      return next({
        log: `getUserSavedShows didnt work: ${err}`,
        status: 500,
        message: { err: 'getUserSavedShows didnt work at third error handler, could not get user saved shows' },
      });
    }
  },

  getShowSeasons: async (req, res, next) => {
    try {
      const showID = req.params.id;
      const result = await db.any(
        `select * from "seasons" where id = ${showID}`
      );
      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `get show seasons failed: ${err}`,
        message: {
          err: 'get show seasons failed, check server log for details',
        },
      };
      return next(errObj);
    }
  },

  createShow: async (req, res, next) => {
    try {
      // const {title, photoURL, } = res.locals.show
      //const title = res.locals.show.name;
      //Column name in DB is 'title', response from API is 'name'
      const {name, image, id} = res.locals.show;
      //console.log(name, image.medium, id);
      const result = await db.none(
        `INSERT INTO shows (title, image, tvmaze_id) VALUES ('${name}', '${image.medium}', '${id}' )`
      );
      return next();
    } catch (err) {
      const errObj = {
        log: `create show failed: ${err}`,
        message: { err: 'create show failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  searchShows: async (req, res, next) => {
    try {
      // TO-DO: update search to be the value we receive from the search input
      const searchInput = 'mandolorian';
      const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${searchInput}`);
      //console.log('response', response);

      let data = await response.json();

      res.locals.show = data;
    
      next();      

    } catch (err) {
      const errObj = {
        log: `search show failed: ${err}`,
        message: { err: 'search show failed, check server log for details' },
      };
      return next(errObj);
    }
  }
};

module.exports = show;
