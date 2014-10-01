app.controller("joinRoadTripController", [
    '$scope','$location', 'roadTripService',
    function($scope, $location, roadTripService) {
        $scope.roadTripToJoin = {};
        $scope.errorMessage = "";
        $scope.joinRoadTrip = function() {
            roadTripService.joinRoadTrip($scope.roadTripToJoin).then(
                function(data) {
                    $location.path('/myroadtrips');
                }, function(e) {
                $scope.errorMessage = e.data.exceptionMessage;
            });
        }
    }]);