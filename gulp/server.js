'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var middleware = require('./proxy');

var gjslint = require('gulp-gjslint'),
    nodemon = require('gulp-nodemon');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    if (middleware.length > 0) {
      server.middleware = middleware;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]' // Only needed for angular apps
  }));

  gulp.task('lint', function () {
    gulp.src('../[]/**/*.js')
      .pipe(jshint())
  })

  gulp.task('nodemon',function(){
    nodemon({
      script: 'servicio/app.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development'
      }
    });
  })

  gulp.task('serve', ['nodemon','watch'], function() {
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('serve:dist', ['build'], function() {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function() {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function() {
    browserSyncInit(options.dist, []);
  });
};
