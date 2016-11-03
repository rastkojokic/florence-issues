var args = require('yargs').argv;
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('dev', function(done) {
  process.env.NODE_ENV = 'development';
  process.env.TEST_ENV = 'development';

  require(config.server);
});

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

gulp.task('vet', function() {
  console.log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'))
    .pipe($.jscs());
});

