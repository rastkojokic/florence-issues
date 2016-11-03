var fs = require('fs');
var _ = require('lodash');

exports.createFiles = function(options, callback) {
  var name = options.name || 'foo-files';
  var count = options.count || 3;
  var filePaths = [];
  var basePath = pathToUpload + '/' + name;
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

