'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RidesCtrl
 * @description
 * # RidesCtrl
 * Controller of the bikeMapsApp
 */

/* globals L: false */

angular.module('bikeMapsApp')
  .controller('RidesCtrl', ['$scope', 'RideDataService', 'MAP_CONSTANTS',
    function ($scope, RideDataService, MAP_CONSTANTS) {

    var map;
    L.mapbox.accessToken = MAP_CONSTANTS.LEAFLET_API_KEY;

    map = L.map('map', {
      layers: L.mapbox.tileLayer('mapbox.streets'),
    });

    // In lieu of mocking out the endpoints let's just iterate the values:
    var stubbedDataIds = [
      {
        userId: 1,
        rideName: 'matt-home-commute',
      },
      {
        userId: 1,
        rideName: 'matt-to-work-commute',
      },
      {
        userId: 2,
        rideName: 'unpredictable-individual-points',
      },

      // Again, for simplicity's sake we're going to stick with Boston area data
      // {
      //   userId: 3,
      //   rideName: '30-miles-points',
      // },
      {
        userId: 4,
        rideName: 'testing-the-wheel',
      },
      {
        userId: 5,
        rideName: 'wrong-way-home',
      },
    ];

    // TODO - make function `getAllRides()` on service
    stubbedDataIds.forEach(function getRides(dataId) {
      var dataIds = {
        userId: dataId.userId,
        rideName: dataId.rideName,
      };
      RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
        var latLngCoords = resp.features.map(function reverseCoords(feature) {
          return L.latLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
            feature.properties.sensorData.phone.altitude
          );
        });
        setStartAndEnd(latLngCoords[0], latLngCoords[latLngCoords.length - 1]);

        var polyline = L.polyline(latLngCoords, {
          weight: 6,
        }).addTo(map);

        zoomMap(map, polyline);

      }).$promise.catch(function catchOnGetRideData(data) {
        console.error(data);
      }).finally(function resolveOnGetRideData() {

      });
    });

    function setStartAndEnd(start, end) {
      // TODO - Make and use flags or red/green icons
      L.marker(start, {
        title: 'Start',
        opacity: 0.75
      }).addTo(map);

      L.marker(end, {
        title: 'End',
        opacity: 0.75
      }).addTo(map);
    }

    function zoomMap(map, polyline) {
      // One reason we have this as it's own function is JS engines' general loack of
      // optimization of code blocks with try catch's
      // Zoom map to the polyline - thanks to this we can skip needing center to map also
      try {
        map.getBounds();
      } catch (e) {
        // Set Bounds only if we get an error from them not being set yet ;-)
        // TODO - assuming we go this route we could check for the greatest values inside `try`
        map.fitBounds(polyline.getBounds());
      }
    }

  }]);
