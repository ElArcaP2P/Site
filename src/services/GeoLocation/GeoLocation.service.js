angular.module('elArcaP2P').factory('GeoLocation', function() {
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
});
