angular.module('elArcaP2P')
.directive('location', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element) {
      var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(-33, 151)
      };
      var map = new google.maps.Map(element[0],mapOptions);
    }
  };
});
