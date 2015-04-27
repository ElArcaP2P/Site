'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    preprocess = require('gulp-preprocess'),
    argv = require('yargs').argv;

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('preprocess',function(done){
    return gulp.src([options.src + '/config.js'])
    .pipe(preprocess({
      context: {
        SERVICE_URL: argv.srv || '/'
      }
    }))
    .pipe(gulp.dest(options.src + '/app/services/'));
  })
  gulp.task('scripts', ['preprocess'],function () {
    return gulp.src(options.src + '/{app,components,directives}/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());
  });
};
