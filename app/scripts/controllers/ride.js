'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RideCtrl
 * @description
 * # RideCtrl
 * Controller of the bikeMapsApp
 */
angular.module('bikeMapsApp')
  .controller('RideCtrl', ['$scope', '$routeParams', 'RideDataService',
    function ($scope, $routeParams, RideDataService) {

    var dataIds = {
      userId: $routeParams.userId,
      rideName: $routeParams.rideName,
    };

    RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
      $scope.ride = resp;
    }).$promise.catch(function catchOnGetRideData(data) {
      console.error(data);
    }).finally(function resolveOnGetRideData() {

    });

  }]);
