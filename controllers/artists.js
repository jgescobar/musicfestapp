// importing the artist model
var Artist = require("../models/artist");
var locus = require('locus');
var request = require('request');

var index = function(req, res, next) {
  Artist.find({}, function(err, artists) {
    if(err) {
      res.json({message: err});
    } else {
      res.json({artists: artists})
    }
  });
};

var create = function(req, res, next) {
  var options = {
    url: "https://api.spotify.com/v1/artists/" + req.body.spotifyId,
    headers: {
      "Accept":   "application/json",
      },
    json: true
  };
  request(options, function(err, res, body) {
    if(err) {
       res.json({message: err});
    } else {
      Artist.findOne( { spotifyId: body.id }, function (err, artist) {
        if (artist) {
          // return done(err)
        } else {
          Artist.create({ name: body.name, imgUrl: body.images[0].url, genre: body.genres, spotifyId: body.id }, function(err, artist) {
            if(err) {
              res.json( {message: err} );
            } else {
              return artist;
            }
          })
        }
      })
    }
 });
};

module.exports = {
  index: index,
  create: create
};
