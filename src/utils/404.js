exports.notFound = function(req, res, next) {
  var data = {
    status: 404,
    message: 'Not Found',
  };

  res.status(404).send(data);
};

