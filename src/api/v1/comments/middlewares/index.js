var compose = require('composable-middleware');
var verifyParams = require('./verifyParams');

exports.createComment = function() {
  return compose()
    .use(verifyParams);
};

exports.getComments = function() {
  return compose()
    .use(verifyParams);
};

