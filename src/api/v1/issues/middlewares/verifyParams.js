var acceptableValues = {
  status: [
    'pending',
    'complete'
  ]
};

module.exports = function(req, res, next) {
  if (req.body.status && !acceptableValues.status.includes(req.body.status)) {
    res.status(400).json({ message: 'Bad request: invalid value for status' });
  } else {
    next();
  }
};

