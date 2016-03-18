var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')
// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var artistsController = require('../controllers/artists');

// root path:
router.get('/', pagesController.login);

//navigation resource path:
router.get('/lineup',   pagesController.lineup);
router.get('/home',   pagesController.home);
router.get('/artist',   pagesController.artist);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// artists resource paths:
router.get('/artists',    artistsController.index);
router.post('/artists',   artistsController.create);


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
