angular.module('elArcaP2P')
  .factory('PlayerSrv', function($q, $http, $rootScope) {

    var currentList, current,
      playerState = 'stop',
      client_id = "b0c3c87de195eadb7f3c78733c4232ca",
      player = angular.element('<audio>');

    function progress() {
      current.progress = player[0].currentTime * 1000;
      $rootScope.$broadcast('PlayerSrv_changeProgress', current.progress);
      return true;
    }

    player.on('timeupdate', progress);
    player.on('ended', next);

    function getState() {
      return playerState;
    }

    function play(track) {
      playerState = 'play';
      track.playing = true;
      track.paused = false;
      current = track;
      player[0].play();
      $rootScope.$broadcast('PlayerSrv_changeState', getState());
    }

    function playPause() {
      if (!current) return;
      if (current.paused) {
        play(current);
      } else {
        pause(current);
      }
    }

    function pause(track) {
      playerState = 'pause';
      track.paused = true;
      player[0].pause();
      $rootScope.$broadcast('PlayerSrv_changeState', getState());
    }

    function stop() {
      if (!current) return;
      playerState = 'stop';
      current.playing = false;
      current.paused = false;
      current.progress = 0;
      //player[0].stop();
      $rootScope.$broadcast('PlayerSrv_changeState', getState());
    }

    function next() {
      stop();
      setCurrent(currentList.tracks[current.index + 1]);
    }

    function previous() {
      stop();
      setCurrent(currentList.tracks[current.index - 1]);
    }

    function getSC(resource, params) {
      return $http({
        url: 'http://api.soundcloud.com/' + resource,
        method: 'GET',
        params: angular.extend({
          client_id: client_id
        }, params)
      })
    }

    function setCurrent(track, noPlay) {
      if (current) {
        if (current.id == track.id)
          return;
        stop(current);
      }
      player.attr('src', track.stream_url + '?client_id=' + client_id);
      track.playing = true;
      track.paused = true;
      current = track;
      if (noPlay != true)
        play(current);
      $rootScope.$broadcast('PlayerSrv_changeCurrent', getCurrent());
    }

    function getCurrent() {
      return current;
    }

    var lastUrl;

    function load(url) {
      var deferred = $q.defer();
      if (lastUrl == url) {
        deferred.resolve(currentList)
      } else {
        lastUrl = url;
        getSC('resolve', {
          url: url
        }).then(function(response) {
          angular.forEach(response.data.tracks, function(item, index) {
            item.playing = false;
            item.paused = false;
            item.progress = 0;
            item.index = index;
          })
          currentList = response.data;
          setCurrent(currentList.tracks[0], true);
          deferred.resolve(currentList);
        }, function(error) {
          deferred.reject(currentList);
        })
      }
      return deferred.promise;
    }

    return {
      'getState': getState,
      'load': load,
      'play': play,
      'pause': pause,
      'playPause': playPause,
      'stop': stop,
      'next': next,
      'previous': previous,
      'getCurrent': getCurrent,
      'setCurrent': setCurrent
    };
  })
