var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var User = require('./models/user');
var session = require('express-session');
var SpotifyStrategy = require('passport-spotify').Strategy;
var locus = require('locus');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database'),
    routes   = require('./config/routes');

// Instantiate a server application.
var app = express();

app.use(cookieParser('notsosecretnowareyou'));
app.use(session({
  secret: 'programming is tough',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// this comes from .env implementation
require('dotenv').config();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//passport stuff
passport.use(new SpotifyStrategy({
    clientID: process.env.CID,
    clientSecret: process.env.CIS,
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne( { spotifyId: profile.id }, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User({
          spotifyId: profile.id
        })
        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      }
    });
  }
));


// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);
// EJS view engine config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Defines all of our "dynamic" routes.
app.use('/', routes);

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

module.exports = app;
