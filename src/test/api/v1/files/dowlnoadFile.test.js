var fs = require('fs');
var config = require('../../../../config');
var files = require('../../../helpers/files/files');
var filesRequestsHelpers = require('../../../helpers/files/requests');
var issueSeedHelpers = require('../../../helpers/issues/seeders');
var Issue = require('../../../../models/issue');

describe('API Files', function() {
  var issue;
  var fileId = '581b2879ccf03618c3a5d500';
  var fileData = 'foobardata';
  var response;
  var body;

  beforeEach(function(done) {
    issueSeedHelpers.seedIssues({}, function(issues) {
      issue = issues[0];

      fs.writeFile(config.FILE_STORAGE + fileId, fileData, function(results) {
        done();
      });
    });
  });

  describe('download issue file', function() {
    it('returns file', function(done) {
      filesRequestsHelpers.downloadFile({
        issueId: issue.id,
        fileId: fileId
      }, function(data) {
        expect(data).to.equal(fileData);

        done();
      });
    });
  });
});

