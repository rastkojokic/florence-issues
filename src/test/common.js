global.request = require('request');
global.expect = require('chai').expect;
global.sinon = require('sinon');
global.apiUrl = 'http://localhost:8001/api/v1/';
global.pathToUpload = 'src/test/tmp/';

var Issue = require('../models/issue');
var Comment = require('../models/comment');
var File = require('../models/file');

beforeEach(function(done) {
  Issue.remove({})
  .then(function() {
    return Comment.remove({});
  })
  .then(function() {
    return File.remove({});
  })
  .then(function() {
    done();
  });
});

