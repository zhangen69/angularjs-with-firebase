'use strict';

var app = angular.module('app', [
    'ui.router', 
    'oc.lazyLoad', 
    // 'firebase'
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

        // about states
        .state('about', {
            url: '/about',
            template: '<div>About Page</div>'
        })
    ;
}]);