angular.module('elArcaP2P')
  .factory('PostsSrv', function($http) {
  self.getPost = function(id){
    return $http({
      method: 'GET',
      url: SERVICE_URL+'post/'+id,
      data: {
        id: id
      }
    });
  };

  return self;
})
