app.controller("addUserController", ['$scope', '$stateParams', '$location', 'roadTripService',
    function ($scope, $stateParams, $location, roadTripService) {
        $scope.newUser = {};
        $scope.isError = false;
        $scope.error = "";
        $scope.newUser.roadTripId = $stateParams.roadTripId;

        $scope.addUser = function() {
            roadTripService.addUserToRoadTrip($scope.newUser).then(
                function(data) {
                    $location.path('#/roadTripDetails/' + data);
                }, function(e) {
                $scope.error = e;
                $scope.isError = true;
            });
        }
    }
])