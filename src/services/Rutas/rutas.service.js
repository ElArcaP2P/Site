angular.module('elArcaP2P')
  .factory('RutasSrv', function($q, Srv) {
    var self = {},
        geojson = false;

    self.getLayers = function() {
      var deferred = $q.defer();
      if(geojson == false){
        Srv.getRutas().then(function(responses) {
          var layers = [];
          responses.forEach(function(response){
            layers.push(L.geoJson(response.data));
          })
          deferred.resolve(layers);
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
