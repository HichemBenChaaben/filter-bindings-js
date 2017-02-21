(function () {
  'use strict';
  angular.module('testApp')
    .directive('imgonload', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.after('<div class="is-loading"></div>');
          element.bind('load', function () {
            element.next('.is-loading').remove();
          });
          element.bind('error', function () {
            console.log('image could not be loaded');
          });
        }
      };
    });
})();
