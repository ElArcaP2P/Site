angular.module('elArcaP2P')
.directive('map', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      map: '=',
      events: '='
    },
    link: function (scope, element, attrs) {
      var map = L.map(element.attr('id')),
          events = scope.events || {};
      angular.forEach(events,function(callback,event){
        map.on(event,callback);
      });
      scope.map = map;
    }
  };
});
