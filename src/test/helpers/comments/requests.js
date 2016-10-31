var createComment = function(options, callback) {
  request.post({
    url: apiUrl + 'issues/' + options.issueId + '/comments',
    form: options.attributes
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

var getComments = function(issueId, callback) {
  request.get({
    url: apiUrl + 'issues/' + issueId + '/comments'
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

exports.createComment = createComment;
exports.getComments = getComments;

