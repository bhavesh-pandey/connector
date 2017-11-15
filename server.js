var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');
var users = require('./routes/users');
var experts = require('./routes/experts');
var services = require('./routes/services');
var management = require('./routes/management');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Expert = require('./models/expert');

mongoose.Promise = promise;
mongoose.connect(config.mlabs);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection-error'));
db.once('open', function () {
  console.log('Connected to connector mongodb');
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use('expert', new LocalStrategy(Expert.authenticate()));
passport.serializeUser(Expert.serializeUser());
passport.deserializeUser(Expert.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(favicon(path.join(__dirname, 'public', 'images', 'co.png')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'views')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/semantic', express.static(path.join(__dirname, 'semantic')));

app.use('/users', users);
app.use('/experts', experts);
app.use('/services', services);
app.use('/management', management);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
