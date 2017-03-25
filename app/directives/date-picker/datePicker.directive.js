angular
    .module('app')
    .directive('datePicker', datePicker);

function datePicker() {
    var directive = {
        link: linkFunction,
    };
    return directive;

    function linkFunction(scope, element, attrs) {
        $(element).datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }
}
