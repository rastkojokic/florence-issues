var Comment = require('../../../models/comment');
var _ = require('lodash');

var seedIssueComments = function(options, callback) {
  var count = options.count || 3;
  var commentsToBeCreated = [];
  var issueId = options.issueId;
  var otherIssueId = options.otherIssueId;

  _.times(count, function() {
    commentsToBeCreated.push({
      text: 'Foo bar comments',
      _issue: issueId
    });
  });

  if (otherIssueId) {
    commentsToBeCreated.push({
      text: 'Foo bar comments',
      _issue: otherIssueId
    });
  }

  Comment.create(commentsToBeCreated)
  .then(function(createdComments) {
    callback(createdComments);
  })
  .catch(function(err) {
    console.log(err);
    throw new Error('fail');
  });
};

exports.seedIssueComments = seedIssueComments;

