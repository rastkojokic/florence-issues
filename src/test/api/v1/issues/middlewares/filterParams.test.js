var compose = require('composable-middleware');
var filterParams = require('../../../../../api/v1/issues/middlewares/filterParams');

describe('Middleware Issue Filter Params', function() {
  it('only allows status params to stay in request body', function(done) {
    var req = {
      body: {
        createdAt: new Date(),
        comments: [],
        files: [],
        unknownAttribute: 'foo',
        status: 'pending'
      }
    };

    compose()
      .use(filterParams)
      .use(function(req, res, next) {
        expect(req.body.createdAt).not.to.exist;
        expect(req.body.comments).not.to.exist;
        expect(req.body.files).not.to.exist;
        expect(req.body.unknownAttribute).not.to.exist;
        expect(req.body.status).to.exist;

        done();
      })(req, {});
  });
});
