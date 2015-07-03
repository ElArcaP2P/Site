angular.module('elArcaP2P')
  .directive('ig', function($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        function callback(){
          $rootScope.$broadcast('embed::ready');
        }

        var parent = element.parent();
        function checkReady() {
          var iframe = parent.find('iframe')
          if (iframe.length == 0)
            return $timeout(checkReady, 150);
          iframe.one('load', callback);
        }

        $timeout(function() {
          instgrm.Embeds.process(element[0]);
          checkReady();
        });
      }
    };
  });
