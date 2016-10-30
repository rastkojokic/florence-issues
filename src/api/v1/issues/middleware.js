var compose = require('composable-middleware');
var filterParams = require('./middleware/filterParams');

exports.createIssue = function() {
  return compose()
    .use(filterParams);
};

