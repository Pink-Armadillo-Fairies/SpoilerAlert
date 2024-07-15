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
      const number = req.body.number;
      const show = req.body.show;
      const result = await db.none(
        `INSERT INTO seasons (number, show) VALUES ('${number}', '${show}')`
      );
      return next();
    } catch (err) {
      const errObj = {
        log: `create season failed: ${err}`,
        message: { err: 'create season failed, check server log for details' },
      };
      return next(errObj);
    }
  },
};

module.exports = season;
