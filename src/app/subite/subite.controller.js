'use strict';

angular.module('elArcaP2P')
  .controller('SubiteCtrl', function ($scope,$mdDialog,$http,$location,$templateCache) {
    $http({
      method: 'GET',
      url: 'app/subite/subite.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    var ModalController = function(scope, $mdDialog, $http){
      scope.closeDialog = function() {
        $mdDialog.hide();
        $location.path('/');
      }
      scope.form = {
        tipo: 'tipo',
        subtipo: false
      };
      scope.$watch('form.tipo',function(val){
        scope.state = 'app/subite/step_'+val+'.html';
      })
      scope.$watch('form.subtipo',function(val){
        if(!val)
          return;
        scope.state = 'app/subite/step_col_'+val+'.html';
      })
      scope.enviar = function(){
        $http.post('/subite',scope.form);
        scope.state = 'app/subite/step_gracias.html';
      };
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
