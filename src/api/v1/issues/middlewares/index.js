var compose = require('composable-middleware');
var filterParams = require('./filterParams');
var verifyParams = require('./verifyParams');

exports.createIssue = function() {
  return compose()
    .use(filterParams)
    .use(verifyParams);
};

exports.updateIssue = function() {
  return compose()
    .use(filterParams)
    .use(verifyParams);
};

