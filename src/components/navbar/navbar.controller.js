'use strict';

angular.module('elArcaP2P')
  .controller('NavbarCtrl', function ($scope,$mdDialog) {
    $scope.showQue = function(ev){
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         template:
           '<md-dialog flex class="doc" aria-label="List dialog">' +
           '  <md-content flex >'+
           '    <iframe scale2parent src="https://docs.google.com/presentation/d/1nUVZIWlCh9eCpMojcH0p8SbLuE90OkYR8lhg1I5kc7s/embed?start=true&loop=true&delayms=10000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>'+
           '  </md-content>' +
           '  <div class="md-actions">' +
           '    <md-button ng-click="closeDialog()">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
         locals: {
           //items: $scope.items
         },
         //controller: DialogController
      });
    }

    $scope.showSubite = function(ev){
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         template:
           '<md-dialog flex class="doc" aria-label="List dialog">' +
           '  <md-content flex >'+
           '    <iframe scale2parent src="https://docs.google.com/forms/d/1ZLp_uwsO_ot0MBrZLlzSYQZnGVTp0G-gnyjh8Rx-Wr0/viewform?embedded=true#start=embed" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Cargando...</iframe>'+
           '  </md-content>' +
           '  <div class="md-actions">' +
           '    <md-button ng-click="closeDialog()">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
         locals: {
           //items: $scope.items
         },
         //controller: DialogController
      });
    }
  });
