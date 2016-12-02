'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RidesCtrl
 * @description
 * # RidesCtrl
 * Controller of the bikeMapsApp
 */
angular.module('bikeMapsApp')
  .controller('RidesCtrl', ['$scope', 'RideDataService', function ($scope, RideDataService) {

    // TODO - make function `getAllRides()` on service
    // RideDataService.getAllRides({}, function successOnGetRides(resp) {
    //   console.log(resp);
    //   // $scope.rides = resp.rides;
    // }).$promise.catch(function catchOnGetRides(data) {
    //   console.error(data);
    // }).finally(function resolveOnGetRides() {

    // });

  }]);
