var router = require('express').Router();
var four0four = require('./utils/404');

module.exports = function(app) {
  app.use('/', four0four.notFound);
};

