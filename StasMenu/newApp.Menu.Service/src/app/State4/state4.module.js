/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">
angular.module('State4App', ['ui.router', 'menuModule']).config(function ($stateProvider,MenuProvider) {
    MenuProvider.addItem({ title: 'State4App', state: 'home.state4' });
    console.info(MenuProvider.getItemsOnConfig());
    $stateProvider.state('home.state4', {
        url: '/State4App',
        templateUrl: 'app/State4/partials/state4.html',
        controller: 'State4AppController'
    });
});

angular.module('State4App').controller('State4AppController', ['$scope', 'Menu', '$state', function (scope,menu,state) {
    scope.items = menu.getItems();
}]);