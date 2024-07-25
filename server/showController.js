const db = require('./db_config.js');

const show = {
  getShows: async (req, res, next) => {
    try {
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
      const title = req.body.title;
      const result = await db.none(
        `INSERT INTO shows (title) VALUES ('${title}')`
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
};

module.exports = show;
