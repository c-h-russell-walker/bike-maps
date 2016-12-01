'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RideCtrl
 * @description
 * # RideCtrl
 * Controller of the bikeMapsApp
 */

/* globals google: false */

angular.module('bikeMapsApp')
  .controller('RideCtrl', ['$scope', '$routeParams', 'RideDataService',
    function ($scope, $routeParams, RideDataService) {

    var userId = $routeParams.userId;
    var rideName = $routeParams.rideName;
    var dataIds = {
      userId: userId,
      rideName: rideName,
    };

    // Angular $scope vars
    $scope.bicycleLayer = true;

    // Google Map vars
    var map;
    var bikeLayer = new google.maps.BicyclingLayer();

    $scope.rideName = rideName;

    RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
      // TODO - Determine a (efficient) way how to get a true center
      // still hacky but at least a better chance it'll be in the middle
      var middle = Math.floor(resp.features.length / 2);
      var arbitraryCtr = resp.features[middle].geometry.coordinates;

      var ctrLat = arbitraryCtr[1];
      var ctrLng = arbitraryCtr[0];
      var userCenter = new google.maps.LatLng(ctrLat, ctrLng);

      // TODO - Tweak/add-to these options and make more dynamic (like zoom value)
      var mapOptions = {
        zoom: 13,
        center: userCenter
      };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      map.data.addGeoJson(resp);

      map.data.forEach(function populateMap(feature) {
        new google.maps.LatLng(feature.getProperty('coordinates'));
      });

      $scope.toggleBicycleLayer();

    }).$promise.catch(function catchOnGetRideData(data) {
      console.error(data);
    }).finally(function resolveOnGetRideData() {

    });

    $scope.toggleBicycleLayer = function() {
      var layer = $scope.bicycleLayer ? map : null;
      bikeLayer.setMap(layer);
    };

  }]);
