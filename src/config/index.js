var envalid = require('envalid');
var dbConnection = require('./database');

var env = envalid.cleanEnv(process.env, {
  DB_CONNECTION: dbConnection[process.env.NODE_ENV]
});

module.exports = env;

