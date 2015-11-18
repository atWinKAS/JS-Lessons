angular.module('routerApp').service('guestsService', ['$http', function($http) {
  this.get = function () {
      return $http.get('http://f2.smartjs.academy/list').then(function(response){
          return response.data;
      });

  }
}]);
