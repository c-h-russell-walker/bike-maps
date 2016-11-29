'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bikeMapsApp
 */
angular.module('bikeMapsApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
