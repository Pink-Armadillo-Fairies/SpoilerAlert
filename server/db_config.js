import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line no-undef
const pgp = require('pg-promise')(/* options */);

const db = pgp(
  `postgresql://postgres.gjitkjeyoojbanjtglag:${process.env.SUPABASE_PG_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
);

export default db;
