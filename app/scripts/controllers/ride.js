'use strict';

/**
 * @ngdoc function
 * @name bikeMapsApp.controller:RideCtrl
 * @description
 * # RideCtrl
 * Controller of the bikeMapsApp
 */

/* globals L: false */
/* globals d3: false */

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

    map = L.map('map', {
      layers: L.mapbox.tileLayer('mapbox.streets'),
    });

    RideDataService.getRideData(dataIds, function successOnGetRideData(resp) {
      latLngCoords = resp.features.map(function reverseCoords(feature) {
        return L.latLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
          feature.properties.sensorData.phone.altitude
        );
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

      initElevationGraph();

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
        title: 'Finish',
        opacity: 0.75
      }).addTo(map);
    }

    function initElevationGraph() {
      /* jshint unused:false */
      var width = 725;
      var height = 400;
      var padding = 25;
      var svg = d3.select('body #ride-container')
        .append('svg:svg').attr({
          width: width,
          height: height,
          id: 'elevation-graph'
        });

      var minAlt = d3.min(latLngCoords, function getMinAlt(data) {
        return data.alt;
      });
      var maxAlt = d3.max(latLngCoords, function getMaxAlt(data) {
        return data.alt;
      });

      var xScale = d3.scale.ordinal();
      xScale.domain(d3.range(latLngCoords.length));
      xScale.rangeBands([0, width - padding], 0.05);

      var yScale = d3.scale.linear();
      yScale.domain([minAlt, maxAlt]);
      yScale.range([height - padding, padding]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom');
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right');

      svg.selectAll('rect')
        .data(latLngCoords)
        .enter()
        .append('rect')
        .attr('width', xScale.rangeBand())
        .attr('x', function(row, idx) {
          return xScale(idx);
        })
        .attr('y', function(row) {
          return (yScale(row.alt));
        })
        .attr('height', function(row) {
          return (height - padding - yScale(row.alt));
        })
        .attr('fill', function(row) {
          return '#666';
        })
        // Hover functionality to visually aid in displaying altitude svg title
        // TODO - Use these event handlers to potentially link graph data to map
        .on('mouseover', function mouseOverAlt() {
          d3.select(this).style({
            opacity: '0.8'
          });
        })
        .on('mouseout', function mouseOutAlt() {
          d3.select(this).style({
            opacity: '1.0'
          });
        })
        // Leverage native browser `title` support of svgs
        .append('svg:title')
        .text(function assignText(data) {
          return 'Altitude: ' + data.alt.toFixed(4);
        });

      // Graph labels/axis additions
      svg.append('g')
        .call(xAxis.tickValues([])) // We're getting rid of x-axis ticks
        .attr('class', 'axis')
        .attr('transform', 'translate(0, ' + (height - padding) + ')');

      svg.append('g')
        .call(yAxis)
        .attr('class', 'axis');

      // Graph label (currently assigned to y-axis)
      // TODO - style this better
      svg.append('text')
        .attr('class', 'y label')
        .attr('dy', '.75em')
        .attr('transform', 'translate(' + (padding) + ', 0)')
        .text('Altitude (in meters) change during ride (hover for altitude values');

      // TODO - Make this label much nicer
      svg.append('text')
        .attr('class', 'x label')
        .attr('dy', '1.25em')
        .attr('transform', 'translate(' + padding + ', ' + (height - padding) + ')')
        .text('Start -> Finish');

      var axisStyle = {
        'stroke': 'Black',
        'fill': 'none',
        'stroke-width': '1px'
      };
      // With this class we won't apply styles to ticks (y-axis numbers)
      svg.selectAll('.axis path')
        .style(axisStyle);
    }

  }]);
