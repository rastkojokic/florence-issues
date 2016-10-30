var Issue = require('../../../models/issue');

exports.post = function(req, res) {
  var newIssue = Issue(req.body);

  newIssue.save()
    .then(function(savedIssue) {
      res.location(req.baseUrl + '/' + savedIssue._id);

      res.status(201).json(savedIssue);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

exports.list = function(req, res) {
  Issue.find({})
    .then(function(issues) {
      res.status(200).json(issues);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

