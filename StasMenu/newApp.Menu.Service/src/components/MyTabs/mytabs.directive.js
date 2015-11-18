/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">
angular.module('menuModule').directive('myTabs', [function () {
    return {

        transclude: true,

        restrict: 'E',
                
        templateUrl: 'components/MyTabs/mytabs.template.html',

        link: function (scope, el, attrs) {
         
        },

        controller: function ($scope) {
            $scope.items = [];

            this.addTabs = function (tab) {
                $scope.items.push(tab);
            }
        }
    }
}]);