'use strict';
app.controller('roadTripDetailsController', [
    '$scope', '$stateParams', 'roadTripService', 'expenseService',
    function ($scope, $stateParams, roadTripService, expenseService) {
        $scope.routeTripDetails = {};
        $scope.roadTripExpenses = {};
        roadTripService.getRoadTripDetailById($stateParams.roadTripId).then(
            function(data) {
                $scope.routeTripDetails = data;

            }, function(e) {

            });

        expenseService.getAllExpenses($stateParams.roadTripId).then(function (data) {
            $scope.roadTripExpenses.expenses = data;
            $scope.roadTripExpenses.totalExpenses = _.reduce(data, function (memo, item) { return memo + item.dollarAmount; }, 0);
        }, function(e) {

        });

        expenseService.mySharedCost($stateParams.roadTripId).then(function (data) {
            $scope.mySharedCost = data;
        }, function(e) {

        });

        expenseService.completeSharedCost($stateParams.roadTripId).then(function (data) {
            $scope.completeSharedCost = data;
        }, function(e) {

        });

    }
]);