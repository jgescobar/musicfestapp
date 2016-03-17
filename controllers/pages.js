var login = function(req, res, next) {
  res.render('pages/login');
};

var lineup = function(req, res, next) {
  res.render('pages/lineup');
};

var home = function(req, res, next) {
  res.render('pages/home');
};

var artist = function(req, res, next) {
  res.render('pages/artist');
};



module.exports = {
  login: login,
  lineup: lineup,
  home: home,
  artist: artist
};


