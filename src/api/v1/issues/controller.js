var Issue = require('../../../models/issue');

exports.post = function(req, res) {
  var newIssue = Issue(req.body);

  newIssue.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json(newIssue);
  });
};

