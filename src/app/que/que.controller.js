'use strict';

angular.module('elArcaP2P')
  .controller('QueCtrl', function ($scope,$mdDialog,$http,$location,$templateCache) {

    $http({
      method: 'GET',
      url: 'app/que/que.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    var ModalController = function(scope, $mdDialog){
      scope.closeDialog = function() {
        $mdDialog.hide();
        $location.path('/');
      }
    }

    function showModal(html){
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         //targetEvent: ev,
         template: html,
         controller: ModalController
      });
    }

  });
