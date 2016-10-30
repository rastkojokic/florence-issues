var Issue = require('../../../models/issue');
var _ = require('lodash');

var seedIssues = function(options, callback) {
  var count = options.count || 3;
  var issuesToBeCreated = []

  _.times(count, function() {
    issuesToBeCreated.push({
      status: 'pending',
      comments: [{
        text: 'Comment text'
      }, {
        text: 'Another comment text'
      }],
      files: [{
        name: 'File name',
        path: 'file/path'
      }, {
        name: 'Another file name',
        path: 'another/file/path'
      }]
    });
  });

  Issue.create(issuesToBeCreated)
    .then(function(createdIssues) {
      callback(null, createdIssues);
    })
    .catch(function(err) {
      console.log(err);
      throw new Error("fail");
    });
};

exports.seedIssues = seedIssues;

