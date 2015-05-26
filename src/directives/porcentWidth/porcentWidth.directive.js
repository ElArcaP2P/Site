angular.module('elArcaP2P')
  .directive('porcentWidth', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        attrs.$observe('porcentWidth', function(value) {
          element.css('width',value+'%');
          element.parent().height(element.siblings('img').height());
        });
        element.parent().height(element.siblings('img').height());
      }
    }
  });
