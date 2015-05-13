'use strict';
var SERVICE_URL = 'http://192.168.0.10:1337/';
angular.module('elArcaP2P', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ngMaterial',
    'ngMdIcons'
  ])
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
    $rootScope
      .$on('$stateChangeSuccess',
        function(event) {
          if (!$window.ga)
            return;
          $window.ga('send', 'pageview', {
            page: $location.path()
          });
        })
  }])
  .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      }).state('acerca_de', {
        url: 'acerca_de',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'QueCtrl'
      }).state('acerca_de_algo', {
        url: 'acerca_de/:algo',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'QueCtrl'
      }).state('subite', {
        url: 'subite/:lat,:lng',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'SubiteCtrl'
      })
      .state('musica', {
        url: 'musica',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'ReproductorCtrl'
      });

    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('red');
  });
