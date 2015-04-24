angular.module('elArcaP2P')
  .factory('Srv', function($http) {

  self.sendForm = function(formPath,data){
    return $http({
      method: 'POST',
      url: SERVICE_URL+'forms/'+formPath,
      data: data
    });
  };

  self.getMarkers = function(data){
    return $http({
      method: 'GET',
      url: SERVICE_URL+'markers',
      data: data
    });
  };

  return self;
})
