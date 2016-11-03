var File = require('../../../models/file');
var Issue = require('../../../models/issue');
var _ = require('lodash');

exports.upload = function(req, res) {
  var issue;

  Issue.findOne({ _id: req.params.issueId })
  .then(function(issueToBeUpdated) {
    issue = issueToBeUpdated;

    return File.create(req.files)
  })
  .then(function(createdFiles) {
    _.each(createdFiles, function(createdFile) {
      issue.files.push(createdFile);
    });

    return issue.save();
  })
  .then(function(issue) {
    res.status(200).json(issue);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

