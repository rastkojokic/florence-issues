var issueSeedHelpers = require('../../../helpers/issues/seeders');
var commentsRequestsHelpers = require('../../../helpers/comments/requests');
var Issue = require('../../../../models/issue');

describe('API Comments', function() {
  describe('create comment', function() {
    var issue;
    var response;
    var body;

    beforeEach(function(done) {
      issueSeedHelpers.seedIssues({}, function(issues) {
        issue = issues[0];

        done();
      });
    });

    describe('text field supplied', function() {
      beforeEach(function(done) {
        commentsRequestsHelpers.createComment({
          issueId: issue._id,
          attributes: {
            text: 'Foo bar comment'
          }
        }, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });

      it('returns status 201', function(done) {
        expect(response.statusCode).to.equal(201);

        done();
      });

      it('returns created comment', function(done) {
        expect(body.text).to.equal('Foo bar comment');
        expect(body._id).to.exist;

        done();
      });

      it('adds comment to issue', function(done) {
        Issue.findOne({ _id: issue.id })
        .populate('comments')
        .then(function(updatedIssue) {
          expect(updatedIssue.comments.length).to.equal(1);

          done();
        })
        .catch(function(err) {
          console.log(err);
          throw new Error("fail");
        });
      });
    });

    describe('text field above 250 characters', function() {
      beforeEach(function(done) {
        commentsRequestsHelpers.createComment({
          issueId: issue._id,
          attributes: {
            text: (new Array(260)).join("x")
          }
        }, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });
      
      it('returns bad request', function(done) {
        expect(response.statusCode).to.equal(400);

        done();
      });
    });

    describe('createdAt field provided', function() {
      beforeEach(function(done) {
        commentsRequestsHelpers.createComment({
          issueId: issue._id,
          attributes: {
            text: 'Foo bar comment',
            createdAt: '2016-05-08T00:00:00.000Z'
          }
        }, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });
      
      it('creates comment with default date', function(done) {
        expect(issue.createdAt).not.to.equal('2016-05-08T00:00:00.000Z');

        done();
      });
    });

    describe('text field missing', function() {
      beforeEach(function(done) {
        commentsRequestsHelpers.createComment({
          issueId: issue._id,
          attributes: {}
        }, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });
      
      it('returns bad request', function(done) {
        expect(response.statusCode).to.equal(400);

        done();
      });
    });

    describe('issue does not exist', function() {
      beforeEach(function(done) {
        commentsRequestsHelpers.createComment({
          issueId: '58172e7afd79030ea1224421',
          attributes: {
            text: 'Foo bar comment'
          }
        }, function(res, resBody) {
          response = res;
          body = resBody;

          done();
        });
      });
      
      it('returns bad request', function(done) {
        expect(response.statusCode).to.equal(400);

        done();
      });
    });
  });
});

