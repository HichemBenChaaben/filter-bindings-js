import gulp from 'gulp';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import conf from './conf';
import {stream as wiredep} from 'wiredep';
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

// inject bower dependencies in index.html
gulp.task('inject',  ['templateCache'], () => {
  const injectScripts = gulp.src([
    './app/app.js',
    './app/{components,services,views,directives}/**/*.js',
    './app/routes.js',
    './app/template.js'
    ]);
  // inject files in the index.html file
  return gulp.src('./app/index.html')
    .pipe(wiredep(_.assignIn({}, conf.wiredep)))
    .pipe($.inject(injectScripts, {
      ignorePath: 'app',
      addRootSlash: false
    }))
    .pipe(gulp.dest('./app'))
    .pipe($.size());
});
