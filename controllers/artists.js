// importing the artist model
var Artist = require("../models/artist");

var index = function(req, res, next) {
  Artist.find({}, function(err, artists) {
    if(err) {
      res.json({message: err});
    } else {
      res.json({artists: artists})
    }
  });
};



module.exports = {
  index: index
};
