'use strict';

angular.module('elArcaP2P')
  .controller('PostCtrl', function($scope, $state, $stateParams, $mdDialog, $http, $templateCache, $timeout) {

    var ModalController = function(scope, $mdDialog, PostsSrv) {
      scope.loading = true;
      scope.href = false;
      $scope.$on('$stateChangeStart', function() {
        $mdDialog.hide();
      })
      PostsSrv.getPost($stateParams.id).then(function(post) {
        scope.remote_type = post.data.origin;
        if (scope.remote_type == 'fb')
          scope.href = "https://www.facebook.com/elarcap2p/posts/" + post.data.origin_id.split('_')[1]
        else if (scope.remote_type == 'tw')
          scope.href = "https://twitter.com/"+ post.data.user +"/status/" + post.data.origin_id
        else
          scope.href = post.data.link;
      })
      scope.$on('embed::ready', function() {
        scope.loading = false;
        scope.$apply();
      });
      scope.closeDialog = function() {
        $mdDialog.hide();
      }
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
      url: 'app/ventanas/post/post.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

  });
