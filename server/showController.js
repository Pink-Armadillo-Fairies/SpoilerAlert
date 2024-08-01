const db = require('./db_config.js');// middleware to get shows a user has been using / watching
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
      // const user_id = req.params.user_id; // get username from request
      const userId = req.cookies.ssid;
      console.log('server side userId is', userId);
      if (!userId) {
        return next({
          log: 'from the getUserSavedShows function: No user_id was provided',
          status: 400,
          message: { err: 'No user_id provided using getUserSavedShows' },
        });
      }
      // console.log('user_id: ', user_id);
      // // get user id with username
      // const  userQuery = `
      // SELECT id FROM users WHERE user_id = $1
      // `;
          
      // const userIdResult = await db.oneOrNone(userQuery, [user_id]);
      // console.log('iserIdResult: ', userIdResult);
      // if (!userIdResult) {
      //   return next({
      //     log: 'from getUserSavedShows function: No user found',
      //     status: 404,
      //     message: { err: 'No user found when querying db with user name'}
      //   })
      // }

      // const userId = userIdResult.id;
      // console.log('const userId = userIdResult.id, userId: ', userId);
      const showsQuery = `
        SELECT DISTINCT s.id, s.title, s.created_at, s.image
        FROM shows s
        INNER JOIN user_shows us ON s.id = us.show_id
        WHERE us.user_id = $1
      `;
      console.log('line 65', userId)
      const result = await db.any(showsQuery, [userId]); // input username and query to get shows
      console.log('const result = await db.any(query, [userId]), result: ', result );
      if(!result || result.length === 0) {
        return next({
          log: 'from the getUserSavedShows function: No shows found in the database',
          status: 404,
          message: { err: 'No shows found using getUserSavedShows' },
        });
      }
  
      res.locals.savedShows = result;
      console.log('res.locals.savedShows = result, result: ', result);
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
      //have if clause to query db before api fetch
      const isShowInDB = await db.oneOrNone('SELECT * FROM shows WHERE title = $1', [name]);
      console.log('is show in db', isShowInDB);
      if (isShowInDB !== null) {
        console.log('show exist in DB');
        res.locals.isShowInDB = isShowInDB;
        return next();
      
      }
    
    const result = await db.none(
      `INSERT INTO shows (title, image, tvmaze_id) VALUES ('${name}', '${image.medium}', '${id}' )`);

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

      // const searchInput = 'mandolorian';
      const searchInput = req.query.searchQuery;
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
  },

  // 'getShow' middleware function to get a single show information including season/episode list from database 
  getShow: async (req, res, next) => {
    try {
      console.log('getShow middleware is called')
  
      // get show_id passed through query parameter 
      const show_id = req.query.show_id;
      // console.log('show_id is ', show_id)

      // declare showInfo object to store all data to be passed to client 
      const showInfo = {}

      // get show information, and store into showData object 
      const getShowQuery = `
        SELECT id, title, image
        FROM shows
        WHERE id = $1;
      `;
      const getShowParam = [show_id];

      const getShowResponse = await db.any(getShowQuery, getShowParam);
      const showData = getShowResponse[0];

      console.log('show Data ', showData)

      showInfo.id = showData.id;
      showInfo.title = showData.title;
      showInfo.image = showData.image;

      // get a season and episode list of this show, and store into showData object  
      const getAllEpisodeQuery = `
        SELECT number AS season_number, episode_number, episode_name
        FROM seasons AS s
        INNER JOIN episodes AS e ON s.id = e.season_id
        WHERE show = $1
      `
      const getAllEpisodeParam = [show_id];
      const getAllEpisodeResponse = await db.any(getAllEpisodeQuery, getAllEpisodeParam);
      showInfo.allEpisodeList = getAllEpisodeResponse;

      // get season length and episode list 
      showInfo.seasons = getSeasons(getAllEpisodeResponse);

      res.locals.showInfo = showInfo;  

      return next();

    } catch (err) {
      const errObj = {
        log: `getShow failed: ${err}`,
        message: { err: 'getShow failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  savePlace: async (req, res, next) => {
    try{
      console.log(`req.body: `, req.body);
      
      const userId = req.cookies.ssid;

      console.log(`userId: `, userId);

      const { showId, seasonNumber, episodeNumber } = req.body;

      const isShowPlaceSaved = await db.oneOrNone('SELECT * FROM watch_history WHERE show_id = $1', [showId]);
      
      if (isShowPlaceSaved !== null) {
        await db.none(
          `UPDATE watch_history
           SET season_number = $1, episode_number = $2
           WHERE show_id = $3 AND user_id = $4`,
          [seasonNumber, episodeNumber, showId, userId]
      );
        return next();
      }
        const result = await db.none(
          `INSERT INTO watch_history (show_id, season_number, episode_number, user_id) VALUES ($1, $2, $3, $4)`,
          [showId, seasonNumber, episodeNumber, userId]  
      );
        console.log("accessing next in savePlace");
        return next();
    } catch(err) {
        const errObj = {
          log: `savePlace failed: ${err}`,
          message: { err: 'savePlace failed, check server log for details' },
        };
        return next(errObj);
    }
  },

  getWatchHistory: async (req, res, next) => {
    console.log('getWatchHistory is hit')
    try {
      const userId = req.cookies.ssid;
      console.log('userId is ', userId)

      // query to get user's watch history of the show (season/episode)
      

    } catch (err) {

    }
  }

}; 


// get season length 
function getSeasons(episodeList) {
  const seasons = new Set(episodeList.map(episode => parseInt(episode.season_number)));
  return Array.from(seasons).sort((a, b) => a - b);
}

module.exports = show;
