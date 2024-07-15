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
};

module.exports = episode;
