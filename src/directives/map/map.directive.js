angular.module('elArcaP2P')
  .directive('map', function($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: {
        map: '=',
        events: '='
      },
      link: function(scope, element, attrs) {
        var elem = element.attr('id');
        $timeout(function() {
          var map = L.map(elem),
            events = scope.events || {};
          angular.forEach(events, function(callback, event) {
            map.on(event, callback);
          });
          scope.map = map;
        });
      }
    }
  });
