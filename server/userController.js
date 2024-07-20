const db = require('./db_config.js');

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
      const username = req.body.usernameInput;
      const password = req.body.passwordInput;
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

  verifyUser: async (req, res, next) => {
    try {
      console.log(req.body);
      // TODO: confirm we are able to get input value from form 
      const username = req.body.usernameInput;
      const password = req.body.passwordInput;
      // TODO: confirm SQL query to match up username/password with db entries
      const verifyUserQuery = `
        SELECT * FROM users
        WHERE username = '${username}' AND password = '${password}'
      `
      const result = await db.query(verifyUserQuery);
      console.log(result);
      if (result.length === 0) {
        return res.status(401).send('Invalid email or password');
      } 
      return next();
    } catch (err) {
      const errObj = {
        log: `Error authenticating user: ${err}`,
        message: { err: 'Authentication failed, check server log for details' },
        status: 500
      };
      return next(errObj);
    }
  }
};

module.exports = user;
