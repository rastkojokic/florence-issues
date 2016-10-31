var requestsHelpers = require('../../../helpers/comments/requests');
var issuesSeedHelpers = require('../../../helpers/issues/seeders');
var commentsSeedHelpers = require('../../../helpers/comments/seeders');

describe('API Comments', function() {
  var issue;
  var response;
  var body;

  beforeEach(function(done) {
    issuesSeedHelpers.seedIssues({}, function(issues) {
      issue = issues[0];
      var otherIssue = issues[1];

      commentsSeedHelpers.seedIssueComments({
        issueId: issue._id,
        otherIssueId: otherIssue._id
      }, function(comments) {

        done();
      });
    });
  });

  describe('issue exists', function() {
    beforeEach(function(done) {
      requestsHelpers.getComments(issue._id, function(res, resBody) {
        response = res;
        body = resBody;

        done();
      });
    });

    it('returns 200 status', function(done) {
      expect(response.statusCode).to.equal(200);

      done();
    });

    it('returns issue comments', function(done) {
      expect(body.length).to.equal(3);
      expect(body[0]._issue[0]).to.equal(issue._id.toString());
      expect(body[1]._issue[0]).to.equal(issue._id.toString());
      expect(body[2]._issue[0]).to.equal(issue._id.toString());

      done();
    });
  });

  describe('issue does not exist', function() {
    beforeEach(function(done) {
      requestsHelpers.getComments('58172e7afd79030ea1224421', function(res, resBody) {
        response = res;
        body = resBody;

        done();
      });
    });

    it('returns 400 bad request status', function(done) {
      expect(response.statusCode).to.equal(400);

      done();
    });
  });
});

