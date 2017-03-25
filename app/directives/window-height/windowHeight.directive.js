angular
    .module('app')
    .directive('windowHeight', windowHeight);

windowHeight.$inject = ['$window'];

function windowHeight($window) {
    var directive = {
        link: linkFunction,
    };
    
    return directive;

    function linkFunction(scope, element, attrs) {
        angular.element(document).ready(function(){
            if($(element).length > 0) {
                $(element).css('height', $(window).height());
            }
        });
        angular.element($window).bind('resize',function(){
            $(element).css('height', $(window).height());
        });
    }
}
