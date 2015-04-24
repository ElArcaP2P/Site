'use strict';

angular.module('elArcaP2P', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ngMaterial'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      }).state('que', {
        url: '/que',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'QueCtrl'
      }).state('subite', {
        url: '/subite',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'SubiteCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
