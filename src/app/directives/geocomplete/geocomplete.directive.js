angular.module('elArcaP2P')
.directive('geocomplete', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element) {
      $(element).geocomplete().bind("geocode:result", function(event, result){
        console.log(result);
      });
      $(element).attr('placeholder','');
    }
  };
});
