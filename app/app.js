(function () {
  'use strict';
  angular.module('testApp', ['ui.router'])
    .config(appConfig);
  appConfig.$inject = ['$compileProvider'];
  function appConfig($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }
})();
