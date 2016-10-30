var requestsHelpers = require('../../../helpers/issues/requests');
var seedHelpers = require('../../../helpers/issues/seeders');

describe('API Issues', function() {
  describe('get issues', function() {
    beforeEach(function(done) {
      seedHelpers.seedIssues({}, function(data) {
        done();
      });
    });

    it('returns response with status 200', function(done) {
      requestsHelpers.getIssues(function(response, body) {
        expect(response.statusCode).to.equal(200);

        done();
      });
    });

    it('returns all the issues', function(done) {
      requestsHelpers.getIssues(function(response, body) {
        var issues = body;

        expect(issues.length).to.equal(3);

        done();
      });
    });
  });
});
