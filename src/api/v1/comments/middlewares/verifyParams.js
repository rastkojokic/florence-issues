var Issue = require('../../../../models/issue');

module.exports = function(req, res, next) {
  Issue.findOne({ _id: req.params.issueId })
  .then(function(issue) {
    if (!issue) {
      res.status(400).json({ message: 'Bad request: issue does not exist' });
    } else {
      next();
    }
  })
  .catch(function(err) {
    if (err.kind === 'ObjectId' && err.name === 'CastError') {
      res.status(400).json({ message: 'Bad request: issue does not exist' });
      return;
    }
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

