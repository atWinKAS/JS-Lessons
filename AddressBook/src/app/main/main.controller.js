'use strict';

angular.module('addressBookApp')
  .controller('MainCtrl', function ($scope, addressBookService) {
	  
	  $scope.currentMan = {};
	  
    
   
	$scope.showMan = function(id){
		console.log('showing: ' + id);
		addressBookService.get(id)
			.then(function(man){
				console.log('found man with id=' + man.id);
				console.log(man);
				$scope.currentMan = man;
			});
	}
	
	var refreshPeopleList = function(){
		console.log('refreshing...');
		addressBookService.list()
			.then(function(data){
				$scope.people = data;
				console.log(data);
			});
	};
	
	refreshPeopleList();
	
	$scope.addMan = function(){
		console.log('adding new man with:');
		console.log($scope.currentMan);
		
		addressBookService.create($scope.currentMan)
			.then(function(data){
				$scope.currentMan = {};
			})
			.then(function(){
				refreshPeopleList();
			});
		
		
		//$scope.currentMan.id = $scope.people.length;
		//$scope.people.push($scope.currentMan);
	}
	
	$scope.saveMan = function(){
		console.log('updating first name with');
		console.log($scope.editForm.firstName.$modelValue);
		$scope.currentMan.firstName = $scope.editForm.firstName.$modelValue;
		addressBookService.update($scope.currentMan)
			.then(function(data){
				refreshPeopleList();
			});
		//var i = $scope.currentMan.id;
		//$scope.people[i] = $scope.currentMan;
	}
	
	$scope.deleteMan = function(){
		console.log('deleting: ' + $scope.currentMan.id);
		$scope.people.splice($scope.currentMan.id, 1);
	}
  });
