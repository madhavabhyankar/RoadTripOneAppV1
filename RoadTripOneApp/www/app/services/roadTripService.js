

app.factory('roadTripService', [
    '$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var roadTripServiceFactory = {};
        _roadTripsOwnedByMe = [];
        _roadTripsIHaveJoined = [];

        var _getAllRoadTripsIOwn = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/Trips/TripsIOwn').then(function (trips) {

                _roadTripsOwnedByMe = trips.data;
                deferred.resolve(trips.data);
            }, function (e) {
                deferred.reject(e);
                //error handling
            });
            return deferred.promise;

        }
        var _addNewRoadTrip = function (newRoadTirp) {
            var deferred = $q.defer();
            $http.post(serviceBase + 'api/Trips/NewRoadTrip', newRoadTirp).then(
                function(trip) {
                    deferred.resolve(trip);
                },
                function(e) {
                    deferred.reject(e);
                });

            return deferred.promise;
        }
        var _getRoadTripDetailById = function (roadTripId) {
            var deferred = $q.defer();

            $http.get(serviceBase + 'api/Trips/TripDetailsById/' + roadTripId).then(
                function(data) {
                    deferred.resolve(data.data);
                }, function(e) {
                    deferred.reject(e);
                });
            return deferred.promise;
        }
        var _addUserToRoadTrip = function(userToAdd) {
            var deferred = $q.defer();

            $http.post(serviceBase + 'api/Trips/AddUserToRoadTrip', userToAdd).then(
                function(data) {
                    deferred.resolve(data);
                }, function(e) {
                    deferred.reject(e);
                });
            return deferred.promise;
        }
        var _joinRoadTrip = function(roadTripJoinModel) {
            var deferred = $q.defer();
            $http.post(serviceBase + 'api/Trips/JoinRoadTrip', roadTripJoinModel).then(
                function(data) {
                    _roadTripsIHaveJoined.push(data);
                    deferred.resolve(data);
                }, function(e) {
                    deferred.reject(e);
                });
            return deferred.promise;
        }
        roadTripServiceFactory.addNewRoadTrip = _addNewRoadTrip;
        roadTripServiceFactory.getAllRoadTripsIOwn = _getAllRoadTripsIOwn;
        roadTripServiceFactory.getRoadTripDetailById = _getRoadTripDetailById;
        roadTripServiceFactory.addUserToRoadTrip = _addUserToRoadTrip;
        roadTripServiceFactory.joinRoadTrip = _joinRoadTrip;
        return roadTripServiceFactory;
    }
]);