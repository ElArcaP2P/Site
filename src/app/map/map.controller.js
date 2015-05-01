'use strict';

angular.module('elArcaP2P')
  .controller('MapCtrl', function($scope, $state, Srv) {
    var markers,
      geoJson,
      map = false,
      layers = {
        'Comic': L.tileLayer('http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.{format}?access_token={access_tocken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          access_tocken: 'pk.eyJ1IjoibmFjYWx0IiwiYSI6InA1MXJqaDAifQ.-ijEh3Iqt1y34rIr5lbPOg',
          mapid: 'mapbox.comic',
          format: 'png32'
        }),
        'Hibrida': new L.Google('HYBRID'),
        'Satelite': new L.Google('SATELLITE')
      };

    var icons = {
      fecha: L.AwesomeMarkers.icon({
        icon: 'fa-headphones',
        prefix: 'fa',
        markerColor: 'green'
      }),
      hospedaje: L.AwesomeMarkers.icon({
        icon: 'fa-bed',
        prefix: 'fa',
        markerColor: 'red'
      }),
      colaboracion_economica: L.AwesomeMarkers.icon({
        icon: 'fa-money',
        prefix: 'fa',
        markerColor: 'green'
      }),
      colaboracion_creativa: L.AwesomeMarkers.icon({
        icon: 'fa-heart',
        prefix: 'fa',
        markerColor: 'red'
      }),
      colaboracion_logistica: L.AwesomeMarkers.icon({
        icon: 'fa-car',
        prefix: 'fa',
        markerColor: 'red'
      }),
      media_texto: L.AwesomeMarkers.icon({
        icon: 'fa-comment',
        prefix: 'fa',
        markerColor: 'cadetblue'
      }),
      media_imagen: L.AwesomeMarkers.icon({
        icon: 'fa-camera',
        prefix: 'fa',
        markerColor: 'cadetblue'
      }),
      media_video: L.AwesomeMarkers.icon({
        icon: 'fa-video-camera',
        prefix: 'fa',
        markerColor: 'cadetblue'
      })
    };

    $scope.$watch('map', function(map) {
      if (!map)
        return;
      Srv.getMarkers().success(function(data, status) {
        var markers = L.markerClusterGroup();
        geoJson = L.geoJson(data, {
          onEachFeature: function(feature) {
            var icon = feature.properties.tipo;
            if (feature.properties.subtipo)
              icon += '_' + feature.properties.subtipo
            //console.log(icon);
            var marker = L.marker(feature.geometry.coordinates.reverse(), {
              icon: icons[icon]
            }).addTo(markers);
            marker.bindPopup(feature.properties.nombre);
          }
        });
        map.addLayer(layers.Comic);
        map.addLayer(markers);
        map.addControl(new L.Control.Layers(layers, {}));
        $scope.map.fitBounds(markers.getBounds());
      });
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
