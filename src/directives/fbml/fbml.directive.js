angular.module('elArcaP2P')
  .directive('fbml', function($rootScope, $facebook) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.attr('data-width',element.width());
        if(attrs.href){
          element.attr('data-href',attrs.href);
          element.attr('href',attrs.href);
        }

        function callback(){
          $rootScope.$broadcast('embed::ready');
          FB.Event.unsubscribe('xfbml.render', callback);
        }

        FB.Event.subscribe('xfbml.render', callback);

        $facebook.parse(element[0]);
      }
    };
  });
