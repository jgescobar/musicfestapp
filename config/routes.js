var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')
// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');

// root path:
router.get('/', pagesController.login);

//lineup resource path:
router.get('/lineup',   pagesController.lineup);

//home resource path:
router.get('/home',   pagesController.home);

//artist resource path:
router.get('/artist',   pagesController.artist);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

router.get('/login',
  passport.authenticate('spotify', { scope: ["user-read-email"] }),
  function(req, res){
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });


module.exports = router;
