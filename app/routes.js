(function() {
  'use strict';
  angular.module('testApp').config(configRun);
  configRun.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function configRun($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('main', {
        url: '/main',
        template: '<main-view></main-view>'
      });
  }
})();
