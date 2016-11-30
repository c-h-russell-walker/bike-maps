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
  .config(['$routeProvider', '$compileProvider', function ($routeProvider,  $compileProvider) {

    // https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false);
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
  }])
  // TODO - Potentially name this better - we're mixing up users and rides
  .factory('RideDataService', ['$resource', function($resource) {
    // https://docs.angularjs.org/api/ngResource/service/$resource#usage
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/api/users/:userId/',
      {},
      {
        'getUsers': {
          params : {
            method: 'GET'
          }
        },
        // TODO - Actually work on this and flesh it out
        'getRideData': {
          params : {
            method: 'GET',
            userId: '@userId',
          }
        }
      },
      {}
    );
  }]);
