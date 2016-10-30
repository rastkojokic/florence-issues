var Issue = require('../../../models/issue');

exports.create = function(req, res) {
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

exports.show = function(req, res) {
  Issue.findOne({ _id: req.params.id })
    .then(function(issue) {
      if (!issue) {
        res.status(404).json({ message: 'Not found' });
        return;
      }

      res.status(200).json(issue);
    })
    .catch(function(err) {
      if (err.value === 'notObjectId') {
        res.status(400).json({ message: 'Bad request' });
        return;
      }

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

exports.destroy = function(req, res) {
  Issue.findByIdAndRemove(req.params.id)
    .then(function(removedIssue) {
      if (!removedIssue) {
        res.status(404).json({ message: 'Not found' });
        return;
      }

      res.status(200).json({ message: 'Issue removed' });
    })
    .catch(function(err) {
      if (err.value === 'notObjectId') {
        res.status(400).json({ message: 'Bad request' });
        return;
      }

      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

exports.update = function(req, res) {
  Issue.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function(updatedIssue) {
      if (!updatedIssue) {
        res.status(404).json({ message: 'Not found' });
        return;
      }

      res.status(200).json(updatedIssue);
    })
    .catch(function(err) {
      if (err.value === 'notObjectId') {
        res.status(400).json({ message: 'Bad request' });
        return;
      }

      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

