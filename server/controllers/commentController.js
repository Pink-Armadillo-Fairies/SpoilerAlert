const db = require('./db_config.js');
const bcrypt = require('bcryptjs');


const comment = {
    getComments: async (req, res, next) => {
        try {
          const result = await db.any('SELECT * from comments WHERE show_id = $1', [133]);

          res.locals.comments = result;
          


          return next();
        } catch (err) {
          const errObj = {
            log: `get comments failed: ${err}`,
            message: { err: 'get comments failed, check server log for details' },
          };
          return next(errObj);
        }
      }
};

module.exports = comment;