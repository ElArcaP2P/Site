'use strict';

angular.module('elArcaP2P')
  .controller('QueCtrl', function ($scope,$stateParams,$mdDialog,$http,$location,$templateCache) {

    $http({
      method: 'GET',
      url: 'app/routes/que/que.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    var stateMap = {
      base: {
        view: 'app/routes/que/que_base.html',
        fullscreen: false,
        controls: false
      },
      nosotros: {
        view: 'app/routes/que/nosotros/nosotros.html',
        fullscreen: false,
        controls: true
      },
      presentacion: {
        view: 'app/routes/que/presentacion/presentacion.html',
        fullscreen: true,
        controls: true
      }
    };

    var ModalController = function(scope, $mdDialog){
      $scope.$on('$stateChangeStart',function(){
        $mdDialog.hide();
      })
      if(typeof $stateParams.algo == 'string'){
        scope.state = stateMap[$stateParams.algo] || stateMap.base;
      }else{
        scope.state = stateMap.base;
      }
      scope.closeDialog = function() {
        $mdDialog.hide();
      }
      scope.goto = function(state,fullsize){
        scope.state = stateMap[state];
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
