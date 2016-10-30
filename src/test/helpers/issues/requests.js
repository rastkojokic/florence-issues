var createIssue = function(options, callback) {
  request.post({
    url: apiUrl + 'issues',
    form: options.attributes
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

var getIssue = function(issueId, callback) {
  request.get({
    url: apiUrl + 'issues/' + issueId
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

var getIssues = function(callback) {
  request.get({
    url: apiUrl + 'issues'
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

var destroyIssue = function(issueId, callback) {
  request.delete({
    url: apiUrl + 'issues/' + issueId
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

var updateIssue = function(issueId, options, callback) {
  request.patch({
    url: apiUrl + 'issues/' + issueId,
    form: options.attributes
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

exports.createIssue = createIssue;
exports.getIssue = getIssue;
exports.getIssues = getIssues;
exports.destroyIssue = destroyIssue;
exports.updateIssue = updateIssue;

