'use strict';

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var config = require('./config/');
var port = process.env.PORT || 8001;
var mongoose = require('mongoose');

var environment = process.env.NODE_ENV;

require('./routes')(app);

mongoose.connect(config.DB_CONNECTION);

switch (environment) {
  case 'test':
    break
  default:
    break;
}

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

