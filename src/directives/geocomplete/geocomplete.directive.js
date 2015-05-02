angular.module('elArcaP2P')
.directive('geocomplete', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      config: '='
    },
    link: function (scope, element) {
      var options = {
        //types: ['(cities)']
      };

      var autocomplete = new google.maps.places.Autocomplete(element[0], options),
          geocoder = new google.maps.Geocoder();

      autocomplete.addListener('place_changed',function(){
        var place = autocomplete.getPlace();
        if (place.geometry || false){
          $rootScope.$broadcast('geocomplete:result',place.geometry.location);
          return;
        }
        geocoder.geocode({
          'address': place.name
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $rootScope.$broadcast('geocomplete:result',results[0].geometry.location);
            return;
          } else {
            //alert("Geocode was not successful for the following reason: " + status);
          }
        });
      });

      $(element).attr('placeholder','');
    }
  };
});
