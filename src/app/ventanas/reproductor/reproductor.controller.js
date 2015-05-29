'use strict';

angular.module('elArcaP2P')
  .controller('ReproductorCtrl', function($scope, $state, $mdDialog, $http, $templateCache, PlayerSrv) {

    var ModalController = function(scope, $mdDialog) {
      $scope.$on('$stateChangeStart', function() {
        $mdDialog.hide();
      })
      $scope.$on('PlayerSrv_changeCurrent',function(ev,_current){
        scope.current = _current;
        if(!scope.$$phase)
          scope.$apply();
      })
      $scope.$on('PlayerSrv_changeProgress',function(ev,progress){
        scope.time = Math.floor(scope.current.duration-progress);
        scope.progress = (progress*100)/scope.current.duration;
        if(!scope.$$phase)
          scope.$apply();
      })
      scope.closeDialog = function() {
        $mdDialog.hide();
      }
      scope.formatTime = function(time) {
        return moment(time).format('mm:ss');
      }
      scope.setCurrent = function(track, noPlay) {
        scope.current = track;
        scope.time = track.duration;
        scope.progress = 0;
        PlayerSrv.setCurrent(track, noPlay);
      }
      scope.playPause = function() {
        PlayerSrv.playPause(scope.current)
      }
      scope.next = function() {
        PlayerSrv.next();
      };
      scope.previous = function() {
        PlayerSrv.previous();
      };
      scope.playlist = false;
      PlayerSrv.load('https://soundcloud.com/yan-adrover/sets/player-el-arcap2p').then(function(playlist) {
        scope.setCurrent(PlayerSrv.getCurrent(),true);
        scope.playlist = playlist;
      })

    }

    function showModal(html) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        //hasBackdrop: ev,
        template: html,
        controller: ModalController
      }).finally(function() {
        $state.go('map');
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
