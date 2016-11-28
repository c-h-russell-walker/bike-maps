'use strict';

/**
 * @ngdoc overview
 * @name bikeMapsApp
 * @description
 * # bikeMapsApp
 *
 * Main module of the application.
 */
angular
  .module('bikeMapsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider,  $compileProvider) {

    // https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false);
    // TODO - Investigate "Strict DI Mode"
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
