import path from 'path';
import gulp from 'gulp';
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});
// determine the scripts size
gulp.task('scripts', () => gulp.src(['./app/**/*.js'])
  .pipe($.size()));