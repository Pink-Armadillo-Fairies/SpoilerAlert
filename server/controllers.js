const pgp = require('pg-promise')(/* options */);
const db = pgp(
  'postgresql://postgres.gjitkjeyoojbanjtglag:touchy-withdrew-wear@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
);

const testMiddleware = {
    test: (req, res, next) => {
      console.log('working');
      return next();
    },
    sqlGetTest: async (req, res, next) => {
      try{
        const result = await db.any('select * from "usernames"')
      console.log(result);
      res.locals.result = result;
      return next();
      } catch (err){
        const errObj = {
          log: `sql query failed: ${err}`, 
          message: { err: 'sql query failed, check server log for details' },
        }
        return next(errObj);
      }
    },
    sqlPostTest: async (req, res, next) => {
      try{
        const username = req.params.username;
        const result = await db.none(`INSERT INTO usernames (username) VALUES ('${username}')`);
      return next();
      } catch (err){
        const errObj = {
          log: `post to sql failed: ${err}`, 
          message: { err: 'post to sql failed, check server log for details' },
        }
        return next(errObj);
      }
    },
  };
  


  module.exports = testMiddleware;
