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

    $scope.rideName = rideName;

    RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
      // TODO - Determine a (efficient) way how to get a true center
      var arbitraryCtr = resp.features[0].geometry.coordinates;

      var ctrLat = arbitraryCtr[1];
      var ctrLng = arbitraryCtr[0];
      var userCenter = new google.maps.LatLng(ctrLat, ctrLng);

      // TODO - Tweak/add-to these options and make more dynamic (like zoom value)
      var mapOptions = {
        zoom: 13,
        center: userCenter
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      map.data.addGeoJson(resp);

      map.data.forEach(function populateMap(feature) {
        var point = new google.maps.LatLng(feature.getProperty('coordinates'));
      });

      // TODO - make this a toggle feature for the user
      // If you use setMap(null) it turns the layer off
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);

    }).$promise.catch(function catchOnGetRideData(data) {
      console.error(data);
    }).finally(function resolveOnGetRideData() {

    });

  }]);
