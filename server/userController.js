const pgp = require('pg-promise')(/* options */);
const db = pgp(
  'postgresql://postgres.gjitkjeyoojbanjtglag:touchy-withdrew-wear@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
);

const users = {
  getUsers: async (req, res, next) => {
    try {
      const result = await db.any('select * from "users"');
      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `sql query failed: ${err}`,
        message: { err: 'sql query failed, check server log for details' },
      };
      return next(errObj);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const result = await db.none(
        `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
      );
      //   res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `create user failed: ${err}`,
        message: { err: 'create user failed, check server log for details' },
      };
      return next(errObj);
    }
  },
};

module.exports = users;
