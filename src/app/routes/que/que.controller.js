'use strict';

angular.module('elArcaP2P')
  .controller('QueCtrl', function ($scope,$mdDialog,$http,$location,$templateCache) {

    $http({
      method: 'GET',
      url: 'app/routes/que/que.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    var stateMap = {
      nosotros: 'app/routes/que/nosotros/nosotros.html',
      presentacion: 'app/routes/que/presentacion/presentacion.html'
    };

    var ModalController = function(scope, $mdDialog){
      $scope.$on('$stateChangeStart',function(){
        $mdDialog.hide();
      })
      scope.state = 'app/routes/que/que_base.html';
      scope.fullScreen = false;
      scope.closeDialog = function() {
        $mdDialog.hide();
      }
      scope.goto = function(state){
        scope.state = stateMap[state];
        scope.fullScreen = true;
      };
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

  });
