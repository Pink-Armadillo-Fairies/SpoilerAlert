const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const testMiddleware = require('./controllers.js');
const user = require('./userController.js');
const show = require('./showController.js');
const season = require('./seasonController.js');
const episode = require('./episodeController.js');

app.use(express.static(path.join(__dirname, '../build')));

app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html'))
); // Serve from the current directory

//test routing to see if db query middleware works
app.get('/test', testMiddleware.sqlGetTest, (req, res) =>
  res.status(250).send(res.locals.result)
);

app.post('/test/:username', testMiddleware.sqlPostTest, (req, res) =>
  res.sendStatus(250)
);

// user routes
app.get('/users', user.getUsers, (req, res) => {
  return res.status(200).send(res.locals.result);
});

app.post('/users/', user.createUser, (req, res) => res.sendStatus(201));

// show routes
app.get('/shows', show.getShows, (req, res) => {
  return res.status(200).send(res.locals.result);
});

app.get('/shows/:id', show.getShowSeasons, (req, res) => {
  return res.status(200).send(res.locals.result);
});

app.post('/shows/', show.createShow, (req, res) => res.sendStatus(201));

// season routes
app.get('/seasons', season.getSeasons, (req, res) => {
  return res.status(200).send(res.locals.result);
});

app.post('/seasons/', season.createSeason, (req, res) => res.sendStatus(201));

// episode routes
app.get('/episodes', episode.getEpisodes, (req, res) => {
  return res.status(200).send(res.locals.result);
});

app.post('/episodes/', episode.createEpisode, (req, res) =>
  res.sendStatus(201)
);

//unknown route handler
//replace 404 with index.html ---create a 404 page inside of react router
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
