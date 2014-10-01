var app = angular.module("RoadTripApp", ['ionic', 'LocalStorageModule', 'angular-loading-bar', 'filters']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: "/home",
            controller: 'homeController',
            templateUrl: 'app/views/home.html'
        });
        $stateProvider.state("login", {
            url: '/login',
            controller: "loginController",
            templateUrl: "/app/views/login.html"
        });

        $stateProvider.state("signup", {
            url: '/signup',
            controller: "signupController",
            templateUrl: "/app/views/signup.html"
        });
        $stateProvider.state("refresh", {
            url: '/refresh',
            controller: "refreshController",
            templateUrl: "/app/views/refresh.html"
        });

        $stateProvider.state("tokens", {
            url: '/tokens',
            controller: "tokensManagerController",
            templateUrl: "/app/views/tokens.html"
        });

        $stateProvider.state("associate", {
            url: '/associate',
            controller: "associateController",
            templateUrl: "/app/views/associate.html"
        });

        $stateProvider.state("myroadtrips", {
            url: '/myroadtrips',
            controller: "myRoadTripsController",
            templateUrl: "/app/views/myroadtrips.html"
        });

        $stateProvider.state("addnewroadtrip", {
            url: '/addnewroadtrip',
            controller: "addNewRoadTripController",
            templateUrl: "/app/views/addnewroadtrip.html"
        });
        $stateProvider.state("tripdetails", {
            url: '/tripdetails/:roadTripId',
            controller: "roadTripDetailsController",
            templateUrl: "/app/views/roadTripDetails.html"
        });
        $stateProvider.state("expenses", {
            url: '/expenses/:roadTripId',
            controller: "roadTripExpensesContoller",
            templateUrl: '/app/views/expenses.html'
        });
        $stateProvider.state("addExpense", {
            url: '/addExpense/:roadTripId',
            controller: "roadTripAddExpenseController",
            templateUrl: '/app/views/addExpense.html'
        });
        $stateProvider.state("addUser", {
            url: '/addUser/:roadTripId',
            controller: 'addUserController',
            templateUrl: '/app/views/adduser.html'
        });
        $stateProvider.state("joinRoadTrip", {
            url: '/joinRoadTrip',
            controller: 'joinRoadTripController',
            templateUrl: '/app/views/joinRoadTrip.html'
        });
        $urlRouterProvider.otherwise("/home");

    }
]);

//app.config(function($routeProvider) {
//    $routeProvider.when("/home", {
//        controller: 'homeController',
//        templateUrl: 'app/views/home.html'
//    });
//    $routeProvider.when("/login", {
//        controller: "loginController",
//        templateUrl: "/app/views/login.html"
//    });

//    $routeProvider.when("/signup", {
//        controller: "signupController",
//        templateUrl: "/app/views/signup.html"
//    });
//    $routeProvider.when("/refresh", {
//        controller: "refreshController",
//        templateUrl: "/app/views/refresh.html"
//    });

//    $routeProvider.when("/tokens", {
//        controller: "tokensManagerController",
//        templateUrl: "/app/views/tokens.html"
//    });

//    $routeProvider.when("/associate", {
//        controller: "associateController",
//        templateUrl: "/app/views/associate.html"
//    });

//    $routeProvider.when("/myroadtrips", {
//        controller: "myRoadTripsController",
//        templateUrl: "/app/views/myroadtrips.html"
//    });

//    $routeProvider.when("/addnewroadtrip", {
//        controller: "addNewRoadTripController",
//        templateUrl: "/app/views/addnewroadtrip.html"
//    });
//    $routeProvider.when("/tripdetails/:roadTripId", {
//        controller: "roadTripDetailsController",
//        templateUrl: "/app/views/roadTripDetails.html"
//    });
//    $routeProvider.when("/expenses/:roadTripId", {
//        controller: "roadTripExpensesContoller",
//        templateUrl: '/app/views/expenses.html'
//    });
//    $routeProvider.when("/addExpense/:roadTripId", {
//        controller: "roadTripAddExpenseController",
//        templateUrl: '/app/views/addExpense.html'
//    });
//    $routeProvider.when("/addUser/:roadTripId", {
//        controller: 'addUserController',
//        templateUrl: '/app/views/adduser.html'
//    });
//    $routeProvider.when("/joinRoadTrip", {
//        controller: 'joinRoadTripController',
//        templateUrl: '/app/views/joinRoadTrip.html'
//    });
//    $routeProvider.otherwise({ redirectTo: "/home" });

//});
//var serviceBase = 'http://localhost:9997/';
var serviceBase = 'http://roadtripplus.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ManageMyRoadTripMobileLocal'
    //clientId: 'ManageMyRoadTripApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});