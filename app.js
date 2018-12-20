var cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const movies = require("./routes/movies");
const actors = require("./routes/actors");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors()); // cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
Actors
 */
app.get('/actors', actors.findAll);
app.post('/actors',actors.addActor);
app.delete('/actors/:id', actors.deleteActor);

/*
Movies
 */
app.post('/movies',movies.addMovie);
app.post('/movies/:id/Review', movies.addMovieReview);
app.get('/movies', movies.findAll);
app.get('/movies/:id',movies.findOne);
app.get('/movies/votes', movies.findTotalVotes);
app.get('/movies/FindByTitle/:title', movies.findMovieByTitle);
app.get('/movies/FindByGenre/:genre', movies.findMovieByGenre);
app.put('/movies/:id/Uvote', movies.incrementUpvotes);
app.put('/movies/:id/Dvote', movies.incrementDownvotes);
app.put('/movies/:id/changeGenre', movies.changeGenre);

app.put('movies/:id/edit', movies.updateMovie);

app.delete('/movies/:id', movies.deleteMovie);
app.delete('/movies/:id/DeleteReview/:reviewId', movies.deleteReview);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
