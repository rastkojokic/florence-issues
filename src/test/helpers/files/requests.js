var fs = require('fs');
var _ = require('lodash');

exports.uploadFiles = function(options, callback) {
  var fileReadStreams = _.map(options.paths, function(path) {
    return fs.createReadStream(path);
  });

  request.post({
    url: apiUrl + 'issues/' + options.issueId + '/files',
    formData: {
      files: fileReadStreams
    }
  }, function (err, res, body) {
    if (err) {
      console.log(err);
      throw new Error("fail");
    }

    callback(res, JSON.parse(body));
  });
};

