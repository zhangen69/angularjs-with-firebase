var app = angular.module('app');

app.controller('app-home-controller', ['$scope', function($scope) {
    var vm = this;
    var db = firebase.firestore();

    vm.message = 'Hello';
    vm.restaurants = [];

    vm.getRestaurants = function() {
        let restaurants = db.collection('restaurants');

        restaurants.get().then(snapshot => {
            vm.restaurants = [];

            snapshot.forEach((doc) => {
                $scope.$apply(function(){
                    const data = doc.data();
                    data.id = doc.id;
                    vm.restaurants.push(data);
                });
            });
    
        });
    }

    vm.getRestaurants();
}]);