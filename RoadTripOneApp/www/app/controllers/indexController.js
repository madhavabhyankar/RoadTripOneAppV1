'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }
    authService.fillAuthData().then(function(data) {
        $scope.authentication = data;
    }, function(e) {

    });

}]);