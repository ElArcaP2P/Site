'use strict';
angular.module('elArcaP2P').factory('GeoLoc', function() {
  var self = {
    lat: -34.919787,
    lng: -57.933096400000004
  };
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      self.lat = position.coords.latitude;
      self.lng = position.coords.longitude;
    });
  }
  return self;
})
angular.module('elArcaP2P')
  .controller('SubiteCtrl', function($scope, $stateParams, $mdToast, $mdDialog, $http, $location, $templateCache, GeoLoc, Srv) {
    $http({
      method: 'GET',
      url: 'app/routes/subite/subite.html',
      cache: $templateCache
    }).success(function(data, status) {
      showModal(data);
    }).error(function(data, status) {

    });

    var ModalController = function(scope, $mdDialog) {
      $scope.$on('$stateChangeStart', function() {
        $mdDialog.hide();
      });
      scope.closeDialog = function() {
        $mdDialog.hide();
        $location.path('/');
      }
      scope.form = {
        tipo: 'tipo',
        subtipo: false,
        position: [parseFloat($stateParams.lng || GeoLoc.lng),parseFloat($stateParams.lat || GeoLoc.lat)]
      };

      scope.$watch('form.tipo', function(val) {
        scope.state = 'app/routes/subite/step_' + val + '.html';
      });

      scope.$watch('form.subtipo', function(val) {
        if (!val)
          return;
        scope.state = 'app/routes/subite/step_col_' + val + '.html';
      });

      scope.location = {
        center: new google.maps.LatLng(scope.form.position[1], scope.form.position[0])
      };

      var geocoder = new google.maps.Geocoder();

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

      geocoder.geocode({
        'latLng': {
          lng: scope.form.position[0],
          lat: scope.form.position[1]
        }
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          scope.form.lugar = results[0].formatted_address;
          scope.$apply('form.lugar');
        } else {
          //alert("Geocode was not successful for the following reason: " + status);
        }
      });

      scope.$on('geocomplete:result', updateResult());
      scope.$on('location:position', updateLocation(scope));

      scope.loading = false;
      scope.enviar = function() {
        scope.loading = true;
        Srv.sendForm('subite', scope.form).then(function() {
          scope.loading = false;
        });
        scope.state = 'app/routes/subite/step_gracias.html';
      };
      scope.donar = function() {
        scope.enviar()
        $('#donacion').submit();
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
        $location.path('/');
      });
    }

  });
