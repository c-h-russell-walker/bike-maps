'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bikeMapsApp
 */
angular.module('bikeMapsApp')
  .controller('UserCtrl', ['$scope', '$routeParams', 'UserDataService', 'RideDataService',
    function ($scope, $routeParams, UserDataService, RideDataService) {

    var userId = $routeParams.userId;

    UserDataService.getUser({userId: userId}, function successOnGetUser(resp) {
      $scope.user = resp;
    }).$promise.catch(function catchOnGetUser(data) {
      console.error(data);
    }).finally(function resolveOnGetUser() {

    });

    RideDataService.getRides({userId: userId}, function successOnGetRides(resp) {
      $scope.rides = resp.rides;
    }).$promise.catch(function catchOnGetRides(data) {
      console.error(data);
    }).finally(function resolveOnGetRides() {

    });

  }]);
