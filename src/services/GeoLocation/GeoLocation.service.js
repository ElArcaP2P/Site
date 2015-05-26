angular.module('elArcaP2P').factory('GeoLocation', function($q) {
  var self = {
    location: {
      lat: false,
      lng: false
    }
  };
  self.getLocation = function(){
    var deferred = $q.defer();
    var location = false;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.location.lat = position.coords.latitude;
        self.location.lng = position.coords.longitude;
        deferred.resolve(self.location);
      },function(error){
        console.error(arguments);
        deferred.reject('Greeting ' + name + ' is not allowed.');
      });
    }
    return deferred.promise;
  }
  return self;
});
