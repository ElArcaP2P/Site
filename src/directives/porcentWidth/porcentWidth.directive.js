angular.module('elArcaP2P')
  .directive('porcentWidth', function() {
    function adjustHeight(element){
      element.parent().height(element.siblings('img').height());
    };
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        attrs.$observe('porcentWidth', function(value) {
          element.css('width',value+'%');
          element.siblings('img').one('load',function(){
            adjustHeight(element);
          });
          adjustHeight(element);
        });
        element.parent().height(element.siblings('img').height());
      }
    }
  });
