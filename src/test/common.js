global.request = require('request');
global.expect = require('chai').expect;
global.sinon = require('sinon');
global.apiUrl = 'http://localhost:8001/api/v1/';

var Issue = require('../models/issue');
var Comment = require('../models/comment');

beforeEach(function(done) {
  Issue.remove({})
  .then(function() {
    return Comment.remove({})
  })
  .then(function() {
    done();
  });
});

