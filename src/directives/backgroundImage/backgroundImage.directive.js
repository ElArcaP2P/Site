angular.module('elArcaP2P')
  .directive('backgroundImage', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        attrs.$observe('backgroundImage', function(value) {
          element.css('background-image','url('+value+')')
        });
      }
    }
  });
