import db from './db_config.js';

const user = {
  getUsers: async (req, res, next) => {
    try {
      const result = await db.any('select * from "users"');
      res.locals.result = result;
      return next();
    } catch (err) {
      const errObj = {
        log: `get users failed: ${err}`,
        message: { err: 'get users failed, check server log for details' },
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

export default user;
