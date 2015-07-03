'use strict';

angular.module('elArcaP2P')
  .controller('MapCtrl', function($scope, $state, $compile, RutasSrv, GeoLocation, Srv, State) {
    var markers,
      geoJson,
      map = false,
      layers = {
        'Comic': L.tileLayer('http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token={access_tocken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          access_tocken: 'pk.eyJ1IjoibmFjYWx0IiwiYSI6InA1MXJqaDAifQ.-ijEh3Iqt1y34rIr5lbPOg',
          mapid: 'nacalt.fc0fff05',
          format: 'png32'
        })
      };

    if (window.google) {
      layers.Hibrida = new L.Google('HYBRID');
      layers.Satelite = new L.Google('SATELLITE');
    }

    var icons = {
      photo: L.AwesomeMarkers.icon({
        icon: 'fa-camera-retro',
        prefix: 'fa',
        markerColor: 'green'
      }),
      image: L.AwesomeMarkers.icon({
        icon: 'fa-instagram',
        prefix: 'fa',
        markerColor: 'green'
      }),
      video: L.AwesomeMarkers.icon({
        icon: 'fa-video-camera',
        prefix: 'fa',
        markerColor: 'green'
      }),
      tweet: L.AwesomeMarkers.icon({
        icon: 'fa-twitter',
        prefix: 'fa',
        markerColor: 'green'
      })
    };

    function initMap(map) {
      map.addLayer(layers.Comic);
      map.addControl(new L.Control.Layers(layers, {}));
      Srv.getMarkers().success(function(data, status) {
        var markers = L.markerClusterGroup();
        geoJson = L.geoJson(data, {
          onEachFeature: function(feature) {
            var icon = feature.properties.type;
            console.log('icon',icon);
            var marker = L.marker(feature.geometry.coordinates.reverse(), {
              icon: icons[icon]
            }).addTo(markers).on('click', function(e) {
              $state.go('post',{
                id: feature.properties.id
              })
            });

            /*if (feature.properties.href || false) {
              var popup = L.popup({
                maxWidth: 500,
                minWidth: 350
              }).setContent('<div fbml class="fb-post" data-href="' + feature.properties.href + '" data-width="300"></div>');
              marker.bindPopup(popup);
            };*/
          }
        });
        map.addLayer(markers);
        $scope.map.fitBounds(markers.getBounds());
      });
      map.on('click', function(e) {
        var marker = e.marker;
      });
      RutasSrv.getLayers().then(function(layers, status) {
        layers.forEach(function(layer){
          map.addLayer(layer);
        });
      });
    }

    $scope.$watch('map', function(map) {
      if (!map)
        return;
      initMap(map);
      $scope.$watch('map');
    });

    var clickMarker = false;

    var click = function(ev) {
      if (clickMarker != false) {
        $scope.map.removeLayer(clickMarker);
      }
      clickMarker = L.marker(ev.latlng).addTo($scope.map);

      var link = $('<button class="md-raised md-primary md-button md-default-theme" tabindex="0">¡Propone un destino!</button>').click(function() {
        $state.go('subite', {
          lat: ev.latlng.lat,
          lng: ev.latlng.lng
        });
      })[0];

      clickMarker.bindPopup(link).openPopup();
    }

    function popupclose(e) {
      if (clickMarker != false && e.popup == clickMarker.getPopup()) {
        $scope.map.removeLayer(clickMarker);
        clickMarker = false;
      }
    };

    $scope.evMap = {
      click: click,
      popupclose: popupclose
    };

  });
