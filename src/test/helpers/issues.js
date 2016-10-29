var createIssue = function(options, callback) {
  request.post({
    url: apiUrl + 'issues',
    form: options.attributes
  }, callback);
};

exports.createIssue = createIssue;

