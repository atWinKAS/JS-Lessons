/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">
angular.module('menuModule').directive('myTab', [function () {
    return {

        require: '^^myTabs',

        restrict: 'E',

        scope: {
            name: '@'
        },

        //templateUrl: 'components/MyTabs/mytabs.template.html',

        link: function (scope, el, attrs,myTabsController) {
            myTabsController.addTabs(scope.name);
        }                
    }
}]);