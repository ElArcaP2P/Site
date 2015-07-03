angular.module('elArcaP2P')
  .directive('tw', function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        function callback() {
          $rootScope.$broadcast('embed::ready');
          twttr.events.unbind('rendered', callback);
        }

        twttr.events.bind('rendered', callback);

        $timeout(function(){
          twttr.widgets.load(element.parent()[0]);
        });

      }
    };
  });
