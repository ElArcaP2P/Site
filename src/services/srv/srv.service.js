angular.module('elArcaP2P')
  .factory('Srv', function($http, $q) {

    self.post = function(path, data) {
      return $http({
        method: 'POST',
        url: SERVICE_URL + path,
        data: data
      });
    };

    self.getMarkers = function(data) {
      return $http({
        method: 'GET',
        url: SERVICE_URL + 'marcas',
        data: data
      });
    };

    self.getRutas = function() {
      function getRoute(id) {
        return $http({
          method: 'GET',
          url: '/rutas/' + id + '.geojson'
        })
      };

      var routes = [1,2],
        promises = [];
      routes.forEach(function(route_id){
        promises.push(getRoute(route_id));
      });

      return $q.all(promises);
    };

    return self;
  })
