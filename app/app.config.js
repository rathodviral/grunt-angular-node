(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/signup');

        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup/signup.html',
                controller: 'signupController as vm'
            })
            .state('landing', {
                url: '/landing',
                templateUrl: 'views/landing/landing.html',
                controller: 'landingController as vm'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact/contact.html',
                controller: 'contactController as vm'
            });

        //$locationProvider.html5Mode(true); //For Remove #

    }

})();