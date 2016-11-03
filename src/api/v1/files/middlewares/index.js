var compose = require('composable-middleware');
var handleUploads = require('./handleUploads');

exports.upload = function() {
  return compose()
    .use(handleUploads);
};

