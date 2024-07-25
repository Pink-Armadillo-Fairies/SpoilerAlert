require('dotenv').config();
const pgp = require('pg-promise')(/* options */);

const db = pgp(
  // use this URL for original database 
  // `postgresql://postgres.gjitkjeyoojbanjtglag:${process.env.SUPABASE_PG_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres` 

  // use this URL for new database 
  `postgresql://postgres.imtqizjjrbybmdgufnwd:${process.env.SUPABASE_PG_KEY}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
);

module.exports = db;
