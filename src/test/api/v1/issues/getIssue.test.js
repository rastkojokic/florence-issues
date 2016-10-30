var requestsHelpers = require('../../../helpers/issues/requests');
var seedHelpers = require('../../../helpers/issues/seeders');

describe('API Issues', function() {
  describe('get issue', function() {
    var issue;

    describe('issue exists', function() {
      beforeEach(function(done) {
        seedHelpers.seedIssues({}, function(issues) {
          issue = issues[0];

          done();
        });
      });

      it('returns response with status 200', function(done) {
        requestsHelpers.getIssue(issue._id, function(response, body) {
          expect(response.statusCode).to.equal(200);

          done();
        });
      });

      it('returns all the issues', function(done) {
        requestsHelpers.getIssue(issue._id, function(response, body) {
          var returnedIssue = body;

          expect(returnedIssue._id).to.equal(issue._id.toString());

          done();
        });
      });
    });

    describe('issue does not exist', function() {
      it('returns 404 not found status', function(done) {
        requestsHelpers.getIssue('aaaaaaaaaa1f611f15da2138', function(response, body) {
          expect(response.statusCode).to.equal(404);

          done();
        });
      });
    });

    describe('provided issue id is not ObjectId', function() {
      it('returns 400 bad request', function(done) {
        requestsHelpers.getIssue('notObjectId', function(response, body) {
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });
  });
});
