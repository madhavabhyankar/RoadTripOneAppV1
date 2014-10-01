'use strict';
app.controller('homeController', [
    '$scope', '$location', '$timeout', 'authService', 'ngAuthSettings',
    function ($scope, $location, $timeout, authService, ngAuthSettings) {

        $scope.loginData = {
            userName: "",
            password: ""
        };
        $scope.myDetails = {
            firstName: "",
            lastName: "",
            email: ""
        };
        $scope.loginMessage = "";

        $scope.savedSuccessfully = false;
        $scope.signUpMessage = "";

        $scope.registration = {
            userName: "",
            password: "",
            confirmPassword: ""
        };
        
        authService.fillAuthData().then(function (data) {
            $scope.authentication = data;
            
        }, function (e) {

        });

        authService.getMyDetails().then(function(data) {
            $scope.myDetails.firstName = data.firstName;
            $scope.myDetails.lastName = data.lastName;
            $scope.myDetails.email = data.email;
        }, function(e) {
            authService.logOut();
            $location.path('/home');
        });

        $scope.login = function () {
            $scope.loginData.useRefreshTokens = false;
            authService.login($scope.loginData).then(function (response) {

                $location.path('/myroadtrips');

            },
             function (err) {
                 $scope.loginMessage = err.error_description;
             });
        };

        $scope.logOut = function () {
            authService.logOut();
            $location.path('/home');
        }
        $scope.authExternalProvider = function (provider) {
                                  console.log("Blah");

            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';


            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                        + "&redirect_uri="+ redirectUri
                                                                        ;
            window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "_blank", "location=0,status=0,width=450,height=600");

            oauthWindow.addEventListener("loadstart", function(event){
                var url = event.originalEvent.url;
                console.log(url);

            });
        };

        $scope.authCompletedCB = function (fragment) {

            $scope.$apply(function () {

                if (fragment.haslocalaccount == 'False') {

                    authService.logOut();

                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token,
                        emailAddress: fragment.email,

                    };

                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authService.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/myroadtrips');

                    },
                 function (err) {
                     $scope.loginMessage = err.error_description;
                 });
                }

            });
        }
        $scope.signUp = function () {

            authService.saveRegistration($scope.registration).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.signUpMessage = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();

            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 $scope.signUpMessage = "Failed to register user due to:" + errors.join(' ');
             });
        };

        var startTimer = function () {
            var timer = $timeout(function () {
                $timeout.cancel(timer);
                $location.path('/home');
            }, 2000);
        }
    }
]);