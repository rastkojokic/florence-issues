/* jshint -W030 */
var compose = require('composable-middleware');
var verifyParams = require('../../../../../api/v1/issues/middlewares/verifyParams');

describe('Middleware Issue Verify Params', function() {
  var req = {
    body: {
      status: null
    }
  };

  describe('status is set to pending', function() {
    it('proceeds next', function(done) {
      req.body.status = 'pending';

      compose()
        .use(verifyParams)
        .use(function(req, res, next) {
          done();
        })(req);
    });
  });

  describe('status is set to complete', function() {
    it('proceeds next', function(done) {
      req.body.status = 'complete';

      compose()
        .use(verifyParams)
        .use(function(req, res, next) {
          done();
        })(req);
    });
  });

  describe('status is set to invalid value', function() {
    it('returns bad request response', function(done) {
      req.body.status = 'not valid status';
      var payload = {
        json: function(payload) {}
      };
      var res = {
        status: function(code) {
          return payload;
        }
      };

      var statusSpy = sinon.spy(res, 'status');
      var payloadSpy = sinon.spy(payload, 'json');

      compose()
        .use(verifyParams)
        .use(function(req, res, next) {
          throw new Error('fail');
        })(req, res);

      expect(statusSpy.withArgs(400).calledOnce).to.be.true;
      expect(payloadSpy.withArgs({ message: 'Bad request: invalid value for status' }).calledOnce).to.be.true;

      done();
    });
  });
});
