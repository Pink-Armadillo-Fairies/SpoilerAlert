const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cookieParser = require('cookie-parser'); 

// const testMiddleware = require('./controllers.js');
const user = require('./controllers/userController.js');
const show = require('./showController.js');
const season = require('./seasonController.js');
const episode = require('./episodeController.js');
const session = require('./controllers/sessionController.js');
const cookie = require('./controllers/cookieController.js');
const comment = require('./controllers/commentController.js');

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/client/assets', express.static(path.resolve(__dirname, '../client/assets')))

// handling incoming request bodies as JSON
app.use(express.json());

// cookie parser - populate req.cookies
app.use(cookieParser());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../build/index.html'))
); // Serve from the current directory


// ROUTE for saving show data in the DB

app.get('/searchshows', show.searchShows, show.createShow, season.createSeason, episode.createEpisodes, (req, res) =>{
  //console.log(res.locals.isShowInDB);
  return res.status(200).json(res.locals.show);
})

// route to get a show information from DB 
app.get('/getshow', show.getShow, (req, res) => {
  return res.status(200).json(res.locals.showInfo);
})

// route for saving the season/episode a user is on

app.post('/saveplace', show.savePlace, (req, res) => {
  return res.status(200).json(res.locals.showPlace);
})

app.get('/getwatchhistory', show.getWatchHistory, (req, res) => {
  return res.status(200).json(res.locals.watchHistory);
})

app.post('/saveusershow', user.saveShow, (req, res) =>{
  console.log("passed the saveShow middleware");
  return res.status(200).send('success');
})


app.get('/getcomments', comment.getComments, (req, res) => {
  return res.status(200).json(res.locals.comments);
})

app.post('/addcomment', comment.addComment, comment.getComments, (req, res) => {
  return res.status(200).json(res.locals.comments);
})



/* test routes for db 
//test routing to see if db query middleware works
app.get('/test', testMiddleware.sqlGetTest, (req, res) =>
  res.status(250).send(res.locals.result)
);

app.post('/test/:username', testMiddleware.sqlPostTest, (req, res) =>
  res.sendStatus(250)
);
*/

// user routes
// app.get('/users', user.getUsers, (req, res) => {
//   return res.status(200).send(res.locals.result);
// });

// // app.post('/users/', user.createUser, (req, res) => res.sendStatus(201)); // -> seems not necessary. to be removed. 

app.post('/users/login', user.verifyUser, session.startSession, cookie.setSSIDCookie, (req, res) => {
  return res.status(200).send('Successful login');
})

app.post('/users/signup', user.createUser, session.startSession, cookie.setSSIDCookie, (req, res) => {
  return res.status(200).send('Successful Signup');
})

// show routes
// app.get('/shows', show.getShows, (req, res) => {
//   return res.status(200).send(res.locals.result);
// });

// middleware to get shows a user has selected / saved, using the user's username, to populate the user's dashboard, queries db using username 
app.get('/shows', show.getUserSavedShows, (req, res) => {
  console.log('from the /shows/:username route handler, res.locals.savedShows:', res.locals.savedShows);
  return res.status(200).send(res.locals.savedShows);
});

// // app.get('/shows/:id', show.getShowSeasons, (req, res) => {
// //   return res.status(200).send(res.locals.result);
// // });

// //app.post('/shows/', show.createShow, (req, res) => res.sendStatus(201));

// // season routes
// app.get('/seasons', season.getSeasons, (req, res) => {
//   return res.status(200).send(res.locals.result);
// });

//app.post('/seasons/', season.createSeason, (req, res) => res.sendStatus(201));

// episode routes
// app.get('/episodes', episode.getEpisodes, (req, res) => {
//   return res.status(200).send(res.locals.result);
// });

// app.post('/episodes/', episode.createEpisode, (req, res) =>
//   res.sendStatus(201)
// );

// app.post('/saveview', episode.saveView, (req,res)=> res.status(275).send(res.locals.watchParty))

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  console.log('catch-all route handler is executed');
  return res.status(200).sendFile(path.join(__dirname, '../build', 'index.html'));
});


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

module.exports = app;