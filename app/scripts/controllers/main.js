'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bikeMapsApp
 */
angular.module('bikeMapsApp')
  .controller('MainCtrl', ['$scope', 'UserDataService', function ($scope, UserDataService) {

    UserDataService.getUsers({}, function successOnGetUsers(resp) {
      $scope.users = resp.users;
    }).$promise.catch(function catchOnGetUsers(data) {
      console.error(data);
    }).finally(function resolveOnGetUsers() {

    });
  }]);
