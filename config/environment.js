var _ = require('lodash');

var localEnvVars = {
  TITLE:      'musicfestapp',
  SAFE_TITLE: 'musicfestapp'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
