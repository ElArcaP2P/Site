'use strict';

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
        url: '/mapa/',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      })
      .state('introduccion', {
        url: '/introduccion/',
        templateUrl: 'app/intro/intro.html',
        controller: 'IntroCtrl'
      })
      .state('acerca_de', {
        url: 'acerca_de',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'QueCtrl'
      })
      .state('acerca_de_algo', {
        url: 'acerca_de/:algo',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'QueCtrl'
      })
      .state('subite', {
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
      })
      .state('post', {
        url: 'post/:id',
        parent: 'map',
        templateUrl: 'app/map/empty.html',
        controller: 'PostCtrl'
      });

    $urlRouterProvider.otherwise('/introduccion/');

    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('blue-grey');
  });

var waitFor = ['fb', 'tw', 'ig'];

function ready(readyNow) {
  waitFor.splice(waitFor.indexOf(readyNow),1);
  if (waitFor.length == 0){
    $('.cargando').remove();
    angular.bootstrap(document, ['elArcaP2P']);
  }
}
