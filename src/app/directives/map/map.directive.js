angular.module('elArcaP2P')
.directive('map', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element) {
      L.mapbox.accessToken = 'pk.eyJ1IjoibmFjYWx0IiwiYSI6InA1MXJqaDAifQ.-ijEh3Iqt1y34rIr5lbPOg';
      var map = L.mapbox.map(element.attr('id'), 'nacalt.lm1f3b66');
    }
  };
});
