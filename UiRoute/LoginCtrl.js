/**
 * Created by atk on 12.03.2015.
 */

angular.module('routerApp').controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {
    $scope.greeting = 'Hola!';


    $scope.login = function(){

        if ($scope.userEmail === 'admin@a.a' && $scope.userEmail === $scope.userPassword){
            console.log("Login Okay");

            $state.go('list', {role: 'admin'});

        }
        else{
            console.log('Login is NOT Okay with: ' + $scope.userEmail + ' - ' + $scope.userPassword);
        }
    };

}]);