var Comment = require('../../../models/comment');

exports.create = function(req, res) {
  Comment.create({
    text: req.body.text,
    _issue: req.params.issueId
  })
  .then(function(comment) {
    res.status(201).json(comment);
  })
  .catch(function(err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'Bad request' });
      return;
    }

    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

exports.list = function(req, res) {
  Comment.find({_issue: req.params.issueId })
  .then(function(comments) {
    res.status(200).json(comments);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

