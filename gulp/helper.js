/**
 *  Common implementation for an error handler of a Gulp plugin
 */
function erorrHandler(title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};
