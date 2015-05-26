angular.module('elArcaP2P')
.directive('twitter', function($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      twttr.widgets.load(element[0]);
    }
  };
});
