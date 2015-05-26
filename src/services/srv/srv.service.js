angular.module('elArcaP2P')
  .factory('Srv', function($http) {

  self.post = function(path,data){
    return $http({
      method: 'POST',
      url: SERVICE_URL+path,
      data: data
    });
  };

  self.getMarkers = function(data){
    return $http({
      method: 'GET',
      url: SERVICE_URL+'marcas',
      data: data
    });
  };

  self.getRutas = function(data){
    return $http({
      method: 'GET',
      url: '/rutas/1.geojson',
      data: data
    });
  };

  return self;
})
