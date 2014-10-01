app.factory('expenseService', [
    '$http', '$q', 'ngAuthSettings',
        function ($http, $q, ngAuthSettings) {
            var serviceBase = ngAuthSettings.apiServiceBaseUri;
            var allExpenses = [];
            var _getAllExpenses = function(roadTripId) {
                var deferred = $q.defer();
                if (allExpenses.length > 0) {
                    deferred.resolve(allExpenses);
                } else {
                    $http.get(serviceBase + 'api/Expense/GetExpensesForTrip/' + roadTripId).then(
                        function(data) {
                            allExpenses = data.data;
                            deferred.resolve(data.data);
                        }, function(e) {
                            deferred.reject(e);
                        });
                }
                return deferred.promise;
            }
            var _addExpense = function(expenseToAdd) {
                var deferred = $q.defer();

                $http.post(serviceBase + 'api/Expense/AddExpenseToTrip', expenseToAdd).then(
                    function(data) {
                        allExpenses.push(data.data);
                        deferred.resolve(data.data);
                    }, function(e) {
                    deferred.reject(e);
                });

                return deferred.promise;
            }

            var _mySharedCost = function(roadTripId) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Expense/GetMySharedCost/' + roadTripId.toString()).then(
                    function(data) {
                        deferred.resolve(data.data);
                    }, function(e) {
                        deferred.reject(e);
                    });
                return deferred.promise;
            };
            var _completeSharedCost = function(roadTripId) {
                
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/Expense/GetCompleteSharedCost/' + roadTripId.toString()).then(
                    function (data) {
                        deferred.resolve(data.data);
                    }, function (e) {
                        deferred.reject(e);
                    });
                return deferred.promise;
            }
            return {
                getAllExpenses: _getAllExpenses,
                addExpense: _addExpense,
                mySharedCost: _mySharedCost,
                completeSharedCost: _completeSharedCost
            };
        }
    ]);