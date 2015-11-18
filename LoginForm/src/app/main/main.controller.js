'use strict';

angular.module('loginApp')
  .controller('MainCtrl', function ($scope, validationService) {
	
	$scope.userEmailResult = true;
	  
	$scope.validateEmail = function(){
		validationService.validateEmail($scope.userEmail)
		.then(function(data){
			console.log('validation result = ' + data);
			$scope.userEmailResult = data;
		});
	};
	  
	$scope.testAction = function(){
		console.log('test action...');
		console.log($scope.loginForm.userEmail);
		
	};  
	
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
