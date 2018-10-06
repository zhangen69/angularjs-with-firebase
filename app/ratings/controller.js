var app = angular.module('app');

app.controller('app-rating-controller', [
  '$scope',
  '$state',
  function($scope, $state) {
    const vm = this;
    const db = firebase.firestore();

    if (!!$state.params.id) {
      var ref = db.collection('restaurants');
      ref
        .doc($state.params.id)
        .get()
        .then(function(doc) {
          var data = doc.data();
          data.id = doc.id;
          data.ratings = [];

          ref
            .doc($state.params.id)
            .collection('ratings')
            .onSnapshot(function(ratings) {
              ratings.forEach(rating => {
                var item = rating.data();
                item.datetime = moment
                  .unix(item.timestamp.seconds)
                  .format('DD MMM YYYY, HH:mm');
                data.ratings.push(item);
              });

              $scope.$apply(() => {
                vm.restaurant = data;
              });
            });
        });
    }

    vm.addRating = function() {

    }
  }
]);

