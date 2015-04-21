'use strict';

angular.module('elArcaP2P')
  .controller('NavbarCtrl', function ($scope,$mdDialog) {

    function DialogController(scope, $mdDialog) {
        scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }

    $scope.showQue = function(ev){
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         targetEvent: ev,
         template:
           '<md-dialog flex class="doc" aria-label="List dialog">' +
           '  <md-content flex>'+
           '    <iframe scale2parent src="https://docs.google.com/document/d/1CzZuYPrjwHnXC189J3Q9dSkk-NOp0yq2C8dkUM7oVuA/pub?embedded=true"></iframe>' +
           '  </md-content>' +
           '  <div class="md-actions">' +
           '    <md-button ng-click="closeDialog()">' +
           '      Cerrar' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
         locals: {
           //items: $scope.items
         },
         controller: DialogController
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
           '      Cerrar' +
           '    </md-button>' +
           '  </div>' +
           '</md-dialog>',
         locals: {
           //items: $scope.items
         },
         controller: DialogController
      });
    }
  });
