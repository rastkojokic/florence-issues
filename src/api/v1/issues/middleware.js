var compose = require('composable-middleware');
var filterParams = require('./middlewares/filterParams');
var verifyParams = require('./middlewares/verifyParams');

exports.createIssue = function() {
  return compose()
    .use(filterParams)
    .use(verifyParams);
};

