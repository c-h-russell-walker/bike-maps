'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RideCtrl
 * @description
 * # RideCtrl
 * Controller of the bikeMapsApp
 */

/* globals L: false */

angular.module('bikeMapsApp')
  .controller('RideCtrl', ['$scope', '$routeParams', 'RideDataService', 'MAP_CONSTANTS',
    function ($scope, $routeParams, RideDataService, MAP_CONSTANTS) {

    var userId = $routeParams.userId;
    var rideName = $routeParams.rideName;
    var dataIds = {
      userId: userId,
      rideName: rideName,
    };

    // Array of coords from Point Collection
    var latLngCoords = [];

    // Angular $scope vars
    $scope.rideName = rideName;

    var map;
    L.mapbox.accessToken = MAP_CONSTANTS.LEAFLET_API_KEY;

    RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
      latLngCoords = resp.features.map(function reverseCoords(feature) {
        return L.latLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
          feature.properties.sensorData.phone.altitude
        );
      });

      map = L.map('map', {
        layers: L.mapbox.tileLayer('mapbox.streets'),
      });

      setStartAndEnd();

      var polyline = L.polyline(latLngCoords, {
        weight: 6,
      }).addTo(map);
      // Zoom map to the polyline - thanks to this we can skip needing center to map also
      map.fitBounds(polyline.getBounds());

      polyline.on('mouseover', function hoverRoute(evt) {
        // TODO - Leverage this somehow
        console.log(evt.latlng);
      });

    }).$promise.catch(function catchOnGetRideData(data) {
      console.error(data);
    }).finally(function resolveOnGetRideData() {

    });

    function setStartAndEnd() {
      // TODO - Make and use flags or red/green icons
      L.marker(latLngCoords[0], {
        title: 'Start',
        opacity: 0.75
      }).addTo(map);

      L.marker(latLngCoords[latLngCoords.length - 1], {
        title: 'End',
        opacity: 0.75
      }).addTo(map);
    }

  }]);
