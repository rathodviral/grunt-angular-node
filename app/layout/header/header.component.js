(function () {
    'use strict';
    angular.module('app').component('headerBar', {
        templateUrl: 'partials/components/header/header.html',
        controller: headerController,
        controllerAs: 'vm'
        /*bindings: {
         name: '='
         }*/
    });

    function headerController() {

    }

})();