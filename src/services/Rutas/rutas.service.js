angular.module('elArcaP2P')
  .factory('RutasSrv', function($q, Srv) {
    var self = {},
        geojson = false;

    self.getLayer = function() {
      var deferred = $q.defer();
      if(geojson == false){
        Srv.getRutas().then(function(response) {
          geojson = response.data;
          deferred.resolve(L.geoJson(geojson));
        }, function() {
          deferred.reject.apply(arguments);
        });
      }else{
        deferred.resolve(L.geoJson(geojson));
      }
      return deferred.promise;
    }

    return self;
  })
