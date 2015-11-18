'use strict';

angular.module('newAppmenuservice', ['ui.router','menuModule','NewState3','State4App'])
//angular.module('newAppmenuservice', ['ui.router', 'menuModule', 'State4App'])
  .config(function ($stateProvider, $urlRouterProvider, MenuProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('home.state1', {
          url: '/state1',
          templateUrl: 'app/partials/state1.html'          
      }).state('home.state2', {
          url: '/state2',
          templateUrl: 'app/partials/state2.html'
      })
      ;

    MenuProvider.addItem({ title: 'Module1', state: 'home.state1' });
    MenuProvider.addItem({ title: 'Module2', state: 'home.state2' });

    $urlRouterProvider.otherwise('/');
  })
;
