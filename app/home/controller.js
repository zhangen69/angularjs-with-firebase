var app = angular.module('app');

app.controller('app-home-controller', ['$scope', '$state', '$firebaseArray', function($scope, $state, $firebaseArray) {
    var vm = this;

    // firebase 
    var ref = firebase.database().ref();
    var messagesRef = ref.child("restaurants");
    var query = messagesRef.orderByChild("timestamp").limitToLast(10);

    var list = $firebaseArray(query);

    // For three-way data bindings, bind it to the scope instead
    $scope.data = list;

    vm.message = 'Hello';
    vm.restaurants = [];
    $scope.list = [];

    vm.greeting = function() {
        vm.message = 'WHat\'s up';
    }

    vm.getRestaurants = function() {
        var query = firebase.firestore()
            .collection('restaurants')
            .orderBy('avgRating', 'desc')
            .limit(50);
        vm.getDocumentsInQuery(query);
    }

    vm.getDocumentsInQuery = function(query) {
        // vm.restaurants = [];

        query.onSnapshot(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();
                data.id = doc.id;
                // doc.data() is never undefined for query doc snapshots
                vm.restaurants.push(data);
                $scope.list.push(data);
                // console.log(doc.id, " => ", doc.data());
            });
        });




        // query.onSnapshot(function(snapshot) {
        //     vm.restaurants = [];

        //     snapshot.forEach(childSnapshot => {
        //         vm.restaurants.push(childSnapshot.data());
        //     })
        // });
    }

    // vm.getRestaurants();
}]);