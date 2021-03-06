'use strict';

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var config = require('./config/');
var port = process.env.PORT || 8001;
var mongoose = require('mongoose');
var morgan = require('morgan');

var environment = process.env.NODE_ENV;

switch (environment) {
  case 'test':
    break;
  default:
    app.use(morgan('dev'));
    break;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

mongoose.connect(config.DB_CONNECTION);
mongoose.Promise = require('q').Promise;

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

