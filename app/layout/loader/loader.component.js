(function () {
    'use strict';
    angular.module('app').component('loader', {
        templateUrl: 'partials/components/loader/loader.html',
        controller: loaderController,
        controllerAs: 'vm',
        bindings: {
            show: '<'
        }
    });

    function loaderController() {

    }

})();