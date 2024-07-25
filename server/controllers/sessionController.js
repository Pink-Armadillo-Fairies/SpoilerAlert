const db = require('../db_config.js');


const session = {}

session.startSession = async (req, res, next) => {
  try{
    const cookie_id = res.locals.user.id;
    const text = `
      INSERT INTO "session" ("cookie_id")
      VALUES ($1)
    `
    const param = [cookie_id];
    const result = await db.none(text, param);
    return next();
  } catch (error) {
    const errObj = {
      log: `create session failed: ${err}`,
      message: { err: 'create session failed, check server log for details' },
    };
    return next(errObj);
  }
}

session.isLoggedIn = async (req, res, next) => {
  
}


module.exports = session;