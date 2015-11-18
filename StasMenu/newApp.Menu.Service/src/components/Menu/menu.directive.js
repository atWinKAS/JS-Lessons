/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">
angular.module('menuModule').directive('menu', ['$document', function ($document) {
    return {
        restrict: 'E',

        scope: {
            items: '=',
            action: '&'
        },
        
        templateUrl: 'components/Menu/menu.directive.template.html',

        link: function (scope,el,attrs) {
            //console.log('ex');
                        
            function hideMenu(event) {
                //console.log(event.target);
                //event.preventDefault();
                //event.stopPropagation();
                if (event.target !== el[0]) {
                    //console.log(el[0]);
                    scope.$evalAsync(function () {
                        scope.action();
                    });
                }

            //$document.off('click', hideMenu);
            }

            scope.$on('$destroy', function () {
                $document[0].removeEventListener('click',hideMenu, true);
            });

            //$document.on('click', hideMenu);
            $document[0].addEventListener('click', hideMenu, true);

        }
    }
}]);