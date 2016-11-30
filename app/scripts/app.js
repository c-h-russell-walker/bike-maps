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
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      // TODO - Revisit URL structure as well as ride id instead of name
      .when('/ride/:userId/:rideName', {
        templateUrl: 'views/ride.html',
        controller: 'RideCtrl',
        controllerAs: 'ride'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  // TODO - move these resource services into their own directory
  .factory('UserDataService', ['$resource', function($resource) {
    // https://docs.angularjs.org/api/ngResource/service/$resource#usage
    // $resource(url, [paramDefaults], [actions], options);
    return $resource('/api/users/:userId/',
      {},
      {
        'getUsers': {
          params : {
            method: 'GET',
          }
        },
        'getUser': {
          params : {
            method: 'GET',
            userId: '@userId',
          }
        }
      },
      {}
    );
  }])
  .factory('RideDataService', ['$resource', function($resource) {
    // TODO - Revisit this URL structure - ugly but working with mock data
    return $resource('/api/users/:userId/rides/:rideName/',
      {},
      {
        'getRides': {
          params : {
            method: 'GET',
            userId: '@userId',
          }
        },
        'getRideData': {
          params : {
            method: 'GET',
            userId: '@userId',
            // TODO - Use ID instead of name - for now simpler to track name of supplied json files
            rideName: '@rideName',
          }
        }
      },
      {}
    );
  }]);
