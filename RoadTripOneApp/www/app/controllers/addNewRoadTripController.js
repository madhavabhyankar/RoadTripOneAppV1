'use strict';

app.controller('addNewRoadTripController', [
    '$scope', '$location', 'roadTripService', function ($scope, $location, roadTripService) {
        $scope.newRoadTrip = {}
        
        $scope.AddNewRoadTrip = function () {
            
            roadTripService.addNewRoadTrip($scope.newRoadTrip);
            $location.path('/myroadtrips');
        }

        
    }
]);