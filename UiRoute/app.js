/**
 * Created by atk on 12.03.2015.
 */
// app.js
angular.module('routerApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'partial-login.html',
            controller: 'LoginCtrl'
        })

        .state('list', {
            //url: '/list/:role',
            url: '/list',
            templateUrl: 'partial-main-list.html',
            controller: 'ListCtrl',
            params: { role : '' },
            resolve: {
                guests: function (guestsService) {
                    return guestsService.get();
                }
            }
        })

        .state('edit', {
            url: '/edit',
            templateUrl: 'partial-main-edit.html'
    });

})
    //FUCKING MAGIC
.run(function ($rootScope) {
        $rootScope.$on('$stateChangeError', function () {
            console.error(arguments);
        })
    });