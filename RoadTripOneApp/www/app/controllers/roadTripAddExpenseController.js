app.controller('roadTripAddExpenseController', [
    '$scope', '$stateParams', '$location', 'expenseService', function ($scope, $stateParams, $location, expenseService) {
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.expenses = {};
        $scope.expenses.tripId = $stateParams.roadTripId;
        $scope.expenses.expenseDate = new Date();
        $scope.saveExpense = function() {
            expenseService.addExpense($scope.expenses).then(function(data) {
                $location.path('/tripdetails/' + data.roadTripId);
            }, function(e) {

            });
        }
    }
]);