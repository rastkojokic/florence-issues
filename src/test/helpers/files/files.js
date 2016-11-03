var fs = require('fs');
var _ = require('lodash');
var config = require('../../../config/');

exports.createFiles = function(options, callback) {
  var name = options.name || 'foo-files';
  var count = options.count || 3;
  var basePath = pathToUpload + '/' + name;
  var filePaths = [];
  var writeFilePromises = [];

  _.times(count, function(index) {
    var writingFilePath = basePath + '-' + index;

    filePaths.push(writingFilePath);
    writeFilePromises.push(fs.writeFile(writingFilePath));
  });

  Promise.all(writeFilePromises)
  .then(function(results) {
    callback(filePaths);
  })
  .catch(function(err) {
    console.log(err);
    throw new Error("fail");
  });
};

