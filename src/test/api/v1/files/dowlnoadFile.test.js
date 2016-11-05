var fileSeedHelpers = require('../../../helpers/files/seeders');
var filesRequestsHelpers = require('../../../helpers/files/requests');
var issueSeedHelpers = require('../../../helpers/issues/seeders');
var Issue = require('../../../../models/issue');

describe('API Files', function() {
  var issue;
  var file;
  var response;
  var body;

  beforeEach(function(done) {

    issueSeedHelpers.seedIssues({}, function(issues) {
      issue = issues[0];

      fileSeedHelpers.seedFile(issues[0], function(createdFile) {
        file = createdFile;

        done();
      });
    });
  });

  describe('download issue file', function() {
    it('returns file', function(done) {
      filesRequestsHelpers.downloadFile({
        issueId: issue.id,
        fileId: file.id
      }, function(data) {
        expect(data).to.equal('foobardata');

        done();
      });
    });
  });
});

