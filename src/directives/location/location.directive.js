angular.module('elArcaP2P')
.directive('location', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      config: '=',
    },
    link: function (scope, element) {
      var mapOptions = {
        zoom: 13,
        center: scope.config.center,
        scrollwheel: false
      };
      var map = new google.maps.Map(element[0],mapOptions),
          marker = new google.maps.Marker({
            position: scope.config.center,
            map: map,
            title: 'Aca!',
            draggable:true,
            animation: google.maps.Animation.DROP
          });
      marker.addListener('dragend',function(){
        var position = marker.getPosition();
        if(position.lat() == scope.config.center.lat()&&position.lng() == scope.config.center.lng())
          return;
        $rootScope.$broadcast('location:position',position);
      });
      map.addListener('click',function(ev){
        var position = ev.latLng;
        if(position.lat() == scope.config.center.lat()&&position.lng() == scope.config.center.lng())
          return;
        marker.setPosition(position);
        //map.setCenter(position);
        $rootScope.$broadcast('location:position',position);
      })
      scope.$watch('config.center',function(_center){
        map.setCenter(_center);
        marker.setPosition(_center);
      })
    }
  };
});
