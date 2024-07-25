const db = require('../db_config.js');
const bcrypt = require('bcryptjs');

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
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUserQuery = `
        INSERT INTO users (username, password) 
        VALUES ($1, $2) 
        RETURNING*
      `

      const createUserParam = [username, hashedPassword];

      const result = await db.any(createUserQuery, createUserParam);
      // pass a created user object to next middleware 
      res.locals.user = result[0];
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
      const username = req.body.usernameInput;
      const password = req.body.passwordInput;

      const verifyUserQuery = `
        SELECT * FROM users
        WHERE username = $1
        LIMIT 1
      `

      const verifyUserParam = [username];

      const result = await db.query(verifyUserQuery, verifyUserParam);

      console.log('result', result)
      
      const storedUser = result[0];

      console.log('stored user is', storedUser)

      if (!storedUser || !(await bcrypt.compare(password, storedUser.password))) {
        // return res.redirect('/signup'); // show an error message in frontend (LoginForm.jsx), instead of handling redirection here.
        return res.status(404).send('error')
      }
      
      res.locals.user = storedUser;
      console.log('storedUser is ', storedUser);
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
