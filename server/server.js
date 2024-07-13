const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const pgp = require('pg-promise');
const db = pgp(
  'postgresql://postgres.gjitkjeyoojbanjtglag:touchy-withdrew-wear@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
);

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html'))
); // Serve from the current directory

app.use('*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
