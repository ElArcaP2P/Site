'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['inject'], function () {

    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([
      options.src + '/{app,components,directives,services}/**/*.css',
      options.src + '/{app,components,directives,services}/**/*.scss'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/{app,components,directives,services}/**/*.js', function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/{app,components,directives,services}/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });
};
