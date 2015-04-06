/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">

angular.module('NewState3', ['menuModule','ui.router']).config(function ($stateProvider, MenuProvider) {
    //MenuProvider.addItem({ title: 'Module3', state: 'state3' });
    MenuProvider.addItem({ title: 'Module3', state: 'home.state3' });

    $stateProvider
      .state('home.state3', {
        //  .state('state3', {
          url: '/state3',
          templateUrl: 'app/State3/partials/state3.html',
          controller: 'State3Ctrl'
      })
});

angular.module('NewState3').controller('State3Ctrl', function ($scope) {
    $scope.someText = 'this text is taken from Ctrl';
});


