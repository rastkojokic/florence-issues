var fs = require('fs');
var _ = require('lodash');
var config = require('../../../config/');
var File = require('../../../models/file');

exports.writeFiles = function(options, callback) {
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
    throw new Error('fail');
  });
};

exports.seedFile = function(issue, callback) {
  File.create({
    path: 'path',
    _issue: issue._id
  })
  .then(function(file) {
    fs.writeFile(config.FILE_STORAGE + file.path, 'foobardata', function(results) {
      callback(file);
    });
  });
};

