var gulp = require('gulp');
var mocha = require('gulp-mocha');
var config = require('./gulp.config')();

gulp.task('test', function(done) {
  process.env.NODE_ENV = 'test';
  process.env.TEST_ENV = 'test';

  require(config.server);
  gulp.src(config.tests, { read: false })
      .pipe(mocha())
      .once('error', function(error) {
        console.log(error);
        process.exit(1);
      })
      .once('end', function() {
        process.exit();
      });
});

