'use strict';

angular.module('autocomplete').directive('autocomplete', ['$http',  function($http){
	return {
		restrict: 'E',
		templateUrl: 'components/autocomplete/autocomplete.html',
		link:function(scope,elem,attrs){
			scope.terms = [];
			
			scope.search = function(){
				
				if (scope.searchText.length > 2){
					//console.log('Searching...');
					//console.log(scope.searchText);
					
					$http.post('http://api.development.elephone.com/api/search', {term: scope.searchText})
						.success(function(data){
							//console.log(data);
							var responseArray = data.hits.hits;
							//console.log(responseArray)
							scope.terms = [];
							for(var i=0; i<responseArray.length; i++){
								if (responseArray[i]._type == 'organization'){
									scope.terms.push(responseArray[i]._source.name);								
								} else if (responseArray[i]._type == 'card'){
									scope.terms.push(responseArray[i]._source.familyName);
								}
							}
							
							//console.log(scope.terms);
							
						});
				} else {
					scope.terms = [];
				}
			};
			
			scope.selectTerm=function(index){
				//console.log(index);
				//console.log(scope.terms[index]);
				scope.searchText = scope.terms[index];
			}
        }
	};
}]);