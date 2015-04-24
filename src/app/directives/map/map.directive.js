angular.module('elArcaP2P')
.directive('map', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      map: '='
    },
    link: function (scope, element, attrs) {
      var map = L.map(element.attr('id'));
      scope.map = map;
    }
  };
});
