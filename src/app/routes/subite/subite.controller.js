'use strict';
angular.module('elArcaP2P')
  .controller('SubiteCtrl', function($scope, $state, $stateParams, $mdToast, $mdDialog, $http, $location, $templateCache, GeoLocation, Srv) {
    $http({
      method: 'GET',
      url: 'app/routes/subite/subite.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    $scope.$on('$stateChangeSuccess', function() {

    });

    var ModalController = function(scope, $mdDialog) {
      scope.state = 'form';
      $scope.$on('$stateChangeStart', function() {
        $mdDialog.hide();
      });
      scope.closeDialog = function() {
        $mdDialog.hide();
      }

      var geocoder = new google.maps.Geocoder();

      var position = false;
      if ($stateParams.lng) {
        position = [parseFloat($stateParams.lng), parseFloat($stateParams.lat)];
        geocoder.geocode({
          'latLng': {
            lng: position[0],
            lat: position[1]
          }
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            scope.form.lugar = results[0].formatted_address;
            scope.$apply('form.lugar');
          } else {
            //alert("Geocode was not successful for the following reason: " + status);
          }
        });
      }

      scope.form = {
        position: position
      };

      scope.getLocation = function() {
        GeoLocation.getLocation().then(function(position) {
          scope.form.position = position;
          scope.location.center = position;
          geocoder.geocode({
            'latLng': position
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              scope.form.lugar = results[0].formatted_address;
              scope.$apply('form.lugar');
            } else {
              //alert("Geocode was not successful for the following reason: " + status);
            }
          });
        })
      }

      scope.location = {
        center: new google.maps.LatLng(scope.form.position[1], scope.form.position[0])
      };

      function updateResult() {
        return function(event, position) {
          scope.form.position = [position.lng(), position.lat()];
          scope.location.center = position;
          scope.$apply('location');
        }
      }

      function updateLocation(scope) {
        return function(event, position) {
          scope.form.position = [position.lng(), position.lat()];
          geocoder.geocode({
            'latLng': position
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              scope.form.lugar = results[0].formatted_address;
              scope.$apply('form.lugar');
            } else {
              //alert("Geocode was not successful for the following reason: " + status);
            }
          });
        }
      }

      scope.$on('geocomplete:result', updateResult());
      scope.$on('location:position', updateLocation(scope));

      scope.loading = false;
      scope.enviar = function() {
        scope.state = 'enviando';
        Srv.post('subite', scope.form).then(function() {
          scope.state = 'redes';
        });
        scope.state = 'app/routes/subite/step_gracias.html';
      };
      scope.gracias = function(){
        scope.state = 'gracias';
      }
    }


    function showModal(html) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        //targetEvent: ev,
        template: html,
        controller: ModalController
      }).finally(function() {
        $state.go('map');
      });
    }

  });
