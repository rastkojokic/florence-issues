var compose = require('composable-middleware');
var handleUploads = require('./handleUploads');
var verifyIssueParams = require('../../comments/middlewares/verifyParams');

exports.upload = function() {
  return compose()
    .use(verifyIssueParams)
    .use(handleUploads);
};

exports.download = function() {
  return compose()
    .use(verifyIssueParams);
};

