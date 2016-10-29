global.request = require('request');
global.expect = require('chai').expect;
global.apiUrl = 'http://localhost:8001/api/v1/';

var Issue = require('../models/issue');

beforeEach(function(done) {
  Issue.remove({}, function() {
    done();
  });
});

