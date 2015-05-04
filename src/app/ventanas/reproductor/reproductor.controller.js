'use strict';

angular.module('elArcaP2P')
  .controller('ReproductorCtrl', function ($scope,$mdDialog,$http,$location,$templateCache) {

    var ModalController = function(scope, $mdDialog){
      $scope.$on('$stateChangeStart',function(){
        $mdDialog.hide();
      })
      scope.closeDialog = function() {
        $mdDialog.hide();
      }
    }

    function showModal(html){
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         //targetEvent: ev,
         template: html,
         controller: ModalController
      }).finally(function() {
        $location.path('/');
      });
    }

    $http({
      method: 'GET',
      url: 'app/ventanas/reproductor/reproductor.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

  });
