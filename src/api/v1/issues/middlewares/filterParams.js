var _ = require('lodash');
var acceptableParams = [
  'status'
];

module.exports = function(req, res, next) {
  req.body = _.pick(req.body, acceptableParams);

  next();
};

