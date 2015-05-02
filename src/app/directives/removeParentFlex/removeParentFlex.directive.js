angular.module('elArcaP2P')
.directive('removeParentFlex', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attrs) {
      var selectores = attrs.removeParentFlex.split(',');
      angular.forEach(selectores,function(selector){
        element.parents(selector).removeAttr('flex');
      });
    }
  };
});
