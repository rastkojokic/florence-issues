module.exports = function() {
  var src = './src/';

  var config = {
    tests: src + 'test/**/*.js',
    server: src + 'app.js'
  };

  return config;
};

