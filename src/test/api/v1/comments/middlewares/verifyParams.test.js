var compose = require('composable-middleware');
var verifyParams = require('../../../../../api/v1/comments/middlewares/verifyParams');
var issuesSeedHelpers = require('../../../../helpers/issues/seeders');

describe.only('Middleware Comment Verify Params', function() {
  var req = {
    params: {
      issueId: null
    }
  };

  describe('passed issue id matches issue', function() {
    beforeEach(function(done) {
      issuesSeedHelpers.seedIssues({}, function(issues) {
        req.params.issueId = issues[0]._id;

        done();
      });
    });

    it('proceeds next', function(done) {
      compose()
        .use(verifyParams)
        .use(function(req, res, next) {
          done();
        })(req);
    });
  });

  describe('passed issue id does not match any issue', function() {
    it('returns bad request response', function(done) {
      req.params.issueId = 'aaaaaaaaaa1f611f15da2138';

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
          throw new Error("fail");
        })(req, res);

      expect(statusSpy.withArgs(400).calledOnce).to.be.true;
      expect(payloadSpy.withArgs({ message: 'Bad request: issue does not exist' }).calledOnce).to.be.true;

      done();
    });
  });
});
