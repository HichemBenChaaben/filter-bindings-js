/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
  directory: 'app/bower_components',
  ignorePath: '',
  fileTypes: {
    html: {
      replace: {
        js: '<script src="/{{filePath}}"></script>',
        css: '<link rel="stylesheet" href="/{{filePath}}" />'
      }
    }
  }
};
