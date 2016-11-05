var fileSeedHelpers = require('../../../helpers/files/seeders');
var filesRequestsHelpers = require('../../../helpers/files/requests');
var issueSeedHelpers = require('../../../helpers/issues/seeders');
var Issue = require('../../../../models/issue');

describe('API Files', function() {
  var issue;
  var filePaths;
  var response;
  var body;

  beforeEach(function(done) {
    issueSeedHelpers.seedIssues({}, function(issues) {
      issue = issues[0];

      done();
    });
  });

  describe('upload', function() {
    beforeEach(function(done) {
      fileSeedHelpers.writeFiles({}, function(paths) {
        filePaths = paths;

        done();
      });
    });

    describe('upload multiple files', function() {
      beforeEach(function(done) {
        filesRequestsHelpers.uploadFiles({ 
          issueId: issue.id,
          paths: filePaths
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

      it('assignes files to the issue', function(done) {
        Issue.findOne({ _id: issue.id })
        .populate('files')
        .then(function(updatedIssue) {
          expect(updatedIssue.files.length).to.equal(3);

          done();
        })
        .catch(function(err) {
          console.log(err);
          throw new Error('fail');
        });
      });
    });

    describe('number of uploaded files exceed max count', function() {
      beforeEach(function(done) {
        fileSeedHelpers.writeFiles({ count: 11 }, function(paths) {
          filesRequestsHelpers.uploadFiles({ 
            issueId: issue.id,
            paths: paths
          }, function(res, resBody) {
            response = res;
            body = resBody;

            done();
          });
        });
      });

      it('returns bad request', function(done) {
        expect(response.statusCode).to.equal(400);

        done();
      });
    });
  });
});

