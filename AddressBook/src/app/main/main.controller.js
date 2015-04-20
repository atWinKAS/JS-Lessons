'use strict';

angular.module('addressBookApp')
  .controller('MainCtrl', function ($scope) {
	  
	  $scope.currentMan = {};
	  
    $scope.people = [
      {
		  'id': 0,
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'user1@mail.com',
        'phone': '+38050'
      },
	  {
		  'id': 1,
        'firstName': 'Jane',
        'lastName': 'Doe',
        'email': 'user2@mail.com',
        'phone': '+38066'
      }
    ];
   
	$scope.showMan = function(id){
		console.log(id);
		
		for (var i = 0; i < $scope.people.length; i++) {
			if ($scope.people[i].id === id) {
				$scope.currentMan = $scope.people[i];
				break;
			}
		}
		
		 
	}
	
	$scope.addMan = function(){
		console.log('adding...');
		$scope.currentMan = {};
		$scope.currentMan.id = $scope.people.length;
		$scope.people.push($scope.currentMan);
	}
	
	$scope.saveFirstName = function(){
		console.log('updating first name with');
		console.log($scope.editForm.firstName.$modelValue);
		$scope.currentMan.firstName = $scope.editForm.firstName.$modelValue;
		var i = $scope.currentMan.id;
		$scope.people[i] = $scope.currentMan;
	}
	
	$scope.deleteMan = function(){
		console.log('deleting: ' + $scope.currentMan.id);
		$scope.people.splice($scope.currentMan.id, 1);
	}
  });
