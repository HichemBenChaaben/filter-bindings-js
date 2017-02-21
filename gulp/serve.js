import gulp from 'gulp';
const browserSync = require('browser-sync').create();
import config from '../gulp.config';
import historyApiFallback from 'connect-history-api-fallback';
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
// Static server
gulp.task('serve:dev', ['inject', 'styles'], () => {
  browserSync.init({
    server: {
      middleware: [historyApiFallback()],
      // the application path for dev
      baseDir: './app'
    }
  });
  gulp.watch('./app/sass/**/*.sass', ['styles']);
  gulp.watch(['./app/{components,services,views}/**/*.js', './app/{app,routes}.js'], ['inject', browserSync.reload]);
  gulp.watch(['./app/{components/views}', './app/index.html'], browserSync.reload);
});

gulp.task('styles', () => gulp.src('./app/sass/**/*.sass')
  .pipe($.plumber({
    errorHandler: $.notify.onError("Error: <%= error.message %>")
  }))
  .pipe($.sass({
    outputStyle: 'compressed'
  }))
  .pipe($.autoprefixer({
    browsers: ['last 2 version', '> 5%']
  }))
  .pipe(gulp.dest('./app/css'))
  .pipe(browserSync.stream()));
