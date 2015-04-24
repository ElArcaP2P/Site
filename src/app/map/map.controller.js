'use strict';

angular.module('elArcaP2P')
  .controller('MapCtrl', function($scope, Srv) {
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

    $scope.$watch('map',function(map){
      if(!map)
        return;
      Srv.getMarkers().success(function(data, status) {
        geoJson = L.geoJson(data, {
          style: function(feature) {
            return {
              color: feature.properties.color
            };
          }
        });
        var markers = L.markerClusterGroup();
        markers.addLayers(geoJson.getLayers());
        map.addLayer(layers.Comic);
        map.addLayer(markers);
        map.addControl(new L.Control.Layers(layers, {}));
        $scope.map.fitBounds(markers.getBounds());
      });
      $scope.$watch('map');
    })
  });
