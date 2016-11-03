var four0four = require('./utils/404');

module.exports = function(app) {
  app.use('/api/v1/issues/:issueId/files', require('./api/v1/files'));
  app.use('/api/v1/issues/:issueId/comments', require('./api/v1/comments'));
  app.use('/api/v1/issues', require('./api/v1/issues'));
  app.use('/', four0four.notFound);
};

