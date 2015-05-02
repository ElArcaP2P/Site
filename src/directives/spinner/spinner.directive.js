angular.module('elArcaP2P')
.directive('spinner', function() {
  console.log('sarasa');
  return {
    restrict: 'E',
    templateUrl: 'app/directives/spinner/spinner.html',
    replace: true,
    scope: {},
    link: function (scope, element){
    }
  };
});
