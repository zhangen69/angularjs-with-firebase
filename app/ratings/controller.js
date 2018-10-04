var app = angular.module('app');

app.controller('app-rating-controller', ['$scope', '$state', function($scope, $state) {
    var vm = this;
    var db = firebase.firestore();

    if (!!$state.params.id) {
        db.collection('restaurants').doc($state.params.id).get().then(doc => {
            $scope.$apply(() => {
                vm.restaurant = doc.data();
            });
        });
    }
}]);