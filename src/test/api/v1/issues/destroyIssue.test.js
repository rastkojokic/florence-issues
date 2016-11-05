var requestsHelpers = require('../../../helpers/issues/requests');
var seedHelpers = require('../../../helpers/issues/seeders');
var Issue = require('../../../../models/issue');

describe('API Issues', function() {
  describe('destroy issue', function() {
    var issueToBeDestroyed;

    describe('issue exists', function() {
      beforeEach(function(done) {
        seedHelpers.seedIssues({}, function(issues) {
          issueToBeDestroyed = issues[0];

          done();
        });
      });

      it('returns response with status 200', function(done) {
        requestsHelpers.destroyIssue(issueToBeDestroyed._id, function(response, body) {
          expect(response.statusCode).to.equal(200);

          done();
        });
      });

      it('removes issue from the database', function(done) {
        requestsHelpers.destroyIssue(issueToBeDestroyed._id, function(response, body) {
          Issue.findOne({ _id: issueToBeDestroyed._id})
            .then(function(issue) {
              if (!issue) {
                done();
              } else {
                throw new Error('fail');
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      });
    });

    describe('issue does not exist', function() {
      it('returns response with status 404', function(done) {
        requestsHelpers.destroyIssue('aaaaaaaaaa1f611f15da2138', function(response, body) {
          expect(response.statusCode).to.equal(404);

          done();
        });
      });
    });

    describe('provided issue id is not ObjectId', function() {
      it('returns 404 not found status', function(done) {
        requestsHelpers.destroyIssue('notObjectId', function(response, body) {
          expect(response.statusCode).to.equal(404);

          done();
        });
      });
    });
  });
});

