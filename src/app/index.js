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
        templateUrl: 'app/map/map.html',
        controller: 'QueCtrl'
      }).state('subite', {
        url: '/subite',
        templateUrl: 'app/map/map.html',
        controller: 'SubiteCtrl'
      }).state('subite.tipo', {
        url: '/subite/tipo',
        templateUrl: 'app/subite/tipo.html'
      }).state('subite.fecha', {
        url: '/subite/fecha',
        templateUrl: 'form-profile.html'
      });

    $urlRouterProvider.otherwise('/');
  })
;
