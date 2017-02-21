import gulp from 'gulp';
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});
const browserSync = require('browser-sync').create();
import gulpif from 'gulp-if';
import historyApiFallback from 'connect-history-api-fallback';
import mainBowerFiles from 'main-bower-files';
/**
 * delete old files
 */
gulp.task('clean', () => $.del(['./build']));

/**
 * Creating angular template cache file
 **/
gulp.task('templateCache', () => gulp.src(['./app/{components,views}/**/*.html'])
  .pipe($.angularTemplatecache('templates.js', {
    module: 'testApp',
    root: ''
  }))
  .pipe($.size())
  .pipe(gulp.dest('./build')));


// Only applies for fonts from bower dependencies
gulp.task('fonts:build', () => gulp.src(mainBowerFiles())
  .pipe($.filter('**/*.{eot,ttf,woff,woff2}'))
  .pipe($.flatten())
  .pipe(gulp.dest('./build/fonts')));

/**
 * build everything!
 */
gulp.task('optimize', ['clean', 'templateCache', 'styles', 'inject', 'fonts:build'], () => {
  const partialsInjectFile = gulp.src('./build/templates.js', {read: false});
  const partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: '/',
    addRootSlash: false
  };
  const minifyHtmlOptions = {
    empty: true,
    spare: true,
    quotes: true,
    conditionals: true,
    cdata: true,
    loose: true
  };
  return gulp.src('./app/index.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref())
    .pipe(gulpif('*.js', $.ngAnnotate({add: true})))
    .pipe(gulpif('*.js', $.uglify()))
    .pipe($.rev())
    .pipe(gulpif('**.html', $.minifyHtml(minifyHtmlOptions)))
    .pipe($.processhtml({}))
    .pipe($.revReplace())
    .pipe($.rename(path => {
      if (path.extname === '.html') {
        path.basename = 'index';
      }
    }))
    .pipe(gulp.dest('./build'))
    .pipe($.size({title: '/', showFiles: true}));
});

/**
 * start gulp build
 */
gulp.task('build', ['optimize'], () => {
  browserSync.init({
    server: {
      middleware: [historyApiFallback()],
      baseDir: './build'
    }
  });
});
