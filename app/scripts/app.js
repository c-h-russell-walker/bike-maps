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
  .constant('MAP_CONSTANTS', {
      'LEAFLET_API_KEY': 'pk.eyJ1IjoiYy1oLXJ1c3NlbGwtd2Fsa2VyIiwiYSI6ImNpdzloOWdtMzAwMDAyemsyMWtrbXlsbWEifQ.dFuLgJuete8USSbAqUjs-w'
    }
  )
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
      .when('/rides', {
        templateUrl: 'views/rides.html',
        controller: 'RidesCtrl',
        controllerAs: 'rides'
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
  // TODO - move this and other services to new JS files
  // Assumes there's just metric and imperial
  .factory('UnitService', function() {
    var toImperial = function(unit, value) {
      // TODO - add other cases - also do we need to separate speed & dist?
      switch (unit) {
        case 'speed':
          return value * 0.621371;
        case 'dist':
          return value * 0.621371;
        default:
          return 'Unit not supported.';
      }
    };

    var toMetric = function(unit, value) {
      // TODO - add other cases - also do we need to separate speed & dist?
      switch (unit) {
        case 'speed':
          return value;
        case 'dist':
          return value;
        default:
          return 'Unit not supported.';
      }
    };

    return {
      convertToImperial: toImperial,
      convertToMetric: toMetric,
    };
  })
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
