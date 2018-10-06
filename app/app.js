'use strict';

var app = angular.module('app', [
    'ui.router', 
    'oc.lazyLoad', 
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //firebase initilize
    firebase.firestore().settings({ timestampsInSnapshots: true });

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // home states
        .state('home', {
            url: '/home',
            templateUrl: './home/home.html',
            controller: 'app-home-controller as home',
            lazyLoad: function ($transition$) {
                return $transition$.injector().get('$ocLazyLoad').load('./home/controller.js');
            }
        })

        // rating states
        .state('rating', {
            url: '/rating/:id',
            templateUrl: './ratings/list.html',
            controller: 'app-rating-controller as rating',
            params: { id: null },
            lazyLoad: function ($transition$) {
                return $transition$.injector().get('$ocLazyLoad').load('./ratings/controller.js');
            }
        })
    ;
}]);