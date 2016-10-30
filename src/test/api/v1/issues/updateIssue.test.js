var requestsHelpers = require('../../../helpers/issues/requests');
var seedHelpers = require('../../../helpers/issues/seeders');
var Issue = require('../../../../models/issue');

describe('API Issues', function() {
  describe('update issue', function() {
    describe('issue exists', function() {
      var issueToBeUpdated;
      var response;
      var body;

      beforeEach(function(done) {
        seedHelpers.seedIssues({}, function(issues) {
          issueToBeUpdated = issues[0];

          done();
        });
      });

      describe('update issue status', function() {
        beforeEach(function(done) {
          requestsHelpers.updateIssue(issueToBeUpdated._id, {
            attributes: {
              status: 'complete'
            }
          }, function(res, resBody) {
            response = res;
            body = resBody;

            done();
          });
        });

        it('returns status 200', function(done) {
          expect(response.statusCode).to.equal(200);

          done();
        });

        it('updates issue status', function(done) {
          expect(body.status).to.equal('complete');

          done();
        });
      });

      describe('update issue status with invalid value', function() {
        beforeEach(function(done) {
          requestsHelpers.updateIssue(issueToBeUpdated._id, {
            attributes: {
              status: 'notValidStatus'
            }
          }, function(res, resBody) {
            response = res;
            body = resBody;

            done();
          });
        });

        it('returns status 400', function(done) {
          expect(response.statusCode).to.equal(400);

          done();
        });
      });

      describe('update createdAt', function() {
        beforeEach(function(done) {
          requestsHelpers.updateIssue(issueToBeUpdated._id, {
            attributes: {
              createdAt: '2016-05-08T00:00:00.000Z'
            }
          }, function(res, resBody) {
            response = res;
            body = resBody;

            done();
          });
        });

        it('does not update issue createdAt', function(done) {
          Issue.findOne({ _id: issueToBeUpdated._id})
            .then(function(issue) {
              expect(issue.createdAt).not.to.equal('2016-05-08T00:00:00.000Z');

              done();
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      });
    });

    describe('issue does not exist', function() {
      it('returns response with status 404', function(done) {
        requestsHelpers.updateIssue('aaaaaaaaaa1f611f15da2138', {
          attributes: {
            status: 'complete'
          }
        }, function(response, body) {
          expect(response.statusCode).to.equal(404);

          done();
        });
      });
    });

    describe('provided issue id is not ObjectId', function() {
      it('returns 400 bad request', function(done) {
        requestsHelpers.updateIssue('notObjectId', {
          attributes: {
            status: 'complete'
          }
        }, function(response, body) {
          expect(response.statusCode).to.equal(400);

          done();
        });
      });
    });
  });
});
