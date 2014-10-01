'use strict';

app.controller('myRoadTripsController', [
    '$scope', 'roadTripService', function ($scope, roadTripService) {
        $scope.myRoadTrips = [];
        $scope.roadTripsExist = false;
        roadTripService.getAllRoadTripsIOwn().then(function(data) {
            $scope.myRoadTrips = data;
            $scope.roadTripsExist = ($scope.myRoadTrips.length > 0) || (data.length > 0) ;
        }, function(e) {

        });

    }
]);