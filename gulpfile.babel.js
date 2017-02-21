var gulp = require('gulp');
var taskListing = require("gulp-task-listing");
var read = require("fs-readdir-recursive");

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
// */
read('./gulp', function(file) {
  return (/\.(js)$/i).test(file);
}).map( file => {
  require('./gulp/' + file);
});

// list all available tasks and sub tasks
gulp.task('list', taskListing);
gulp.task('default', ['list', 'inject', 'serve:dev']);
