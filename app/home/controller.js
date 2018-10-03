var app = angular.module('app');

app.controller('app-home-controller', ['$scope', function($scope) {
    var vm = this;
    var db = firebase.firestore();

    vm.message = 'Hello';
    vm.restaurants = [];

    vm.getRestaurants = function() {
        let restaurants = db.collection('restaurants');

        restaurants.get().then((querySnapshot) => {
            vm.restaurants = [];

            querySnapshot.forEach((doc) => {
                $scope.$apply(function(){
                    vm.restaurants.push(doc.data()) ;
                });
            });
    
        });
    }

    vm.getRestaurants();
}]);