angular.module('elArcaP2P')
  .directive('botonReproductor', function($rootScope, PlayerSrv) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directives/botonReproductor/botonReproductor.html',
      link: function(scope, element, attrs) {
        var statesIcons = {
          'play': 'volume_up',
          'pause': 'volume_mute',
          'stop': 'play_circle_outline'
        }

        scope.icon = statesIcons[PlayerSrv.getState()];

        scope.$on('PlayerSrv_changeState',function(ev,state){
          scope.icon = statesIcons[PlayerSrv.getState()];
        })
        
      }
    }
  });
