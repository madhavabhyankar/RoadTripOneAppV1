app.controller("roadTripExpensesContoller", [
    '$scope', '$stateParams', 'expenseService',
    function ($scope, $stateParams, expenseService) {
        $scope.expenses = [];
        $scope.roadTripid = $stateParams.roadTripId;
        expenseService.getAllExpenses($stateParams.roadTripId).then(function (data) {
            $scope.expenses = data;
        }, function(e) {
            //error
        });
    }
]);