(function () {
    'use strict';
    angular.module('app').component('footerBar', {
        templateUrl: 'partials/components/footer/footer.html',
        controller: footerController,
        controllerAs: 'vm'
        /*bindings: {
         name: '='
         }*/
    });

    function footerController() {

    }

})();