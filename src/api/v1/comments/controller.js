var Issue = require('../../../models/issue');
var Comment = require('../../../models/comment');

exports.create = function(req, res) {
  var issue;
  var comment;

  Issue.findOne({ _id: req.params.issueId })
  .then(function(issueToBeUpdated) {
    issue = issueToBeUpdated;

    return Comment.create({
      text: req.body.text,
      _issue: req.params.issueId
    });
  })
  .then(function(createdComment) {
    comment = createdComment;
    issue.comments.push(comment);

    return issue.save();
  })
  .then(function(issue) {
    res.status(201).json(comment);
  })
  .catch(function(err) {
    if (err.errors) {
      if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'maxlength') {
        res.status(400).json({ message: 'Bad request: comment text is too long (250 chars maximum)' });
        return;
      } else if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'required') {
        res.status(400).json({ message: 'Bad request: text cannot be blank' });
        return;
      } else if(err.errors.text.name === 'ValidatorError' && err.errors.text.kind === 'regexp') {
        res.status(400).json({ message: 'Bad request: text cannot be blank' });
        return;
      }
    }

    res.status(500).json({ message: 'Internal server error' });
  });
};

exports.list = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  var limit = parseInt(req.query.limit) || 10;

  Comment.paginate({ _issue: req.params.issueId }, {
    page: page, 
    limit: limit 
  })
  .then(function(comments) {
    res.set({
      'X-Total-Count': comments.total,
      'X-Total-Pages': comments.pages,
      'X-Current-Page': comments.page
    });

    res.status(200).json(comments.docs);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

