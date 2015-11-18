'use strict';

angular.module('wikiApp')
  .controller('MainCtrl', function ($scope, $http, $sce, $q) {
	  
	  var cache = {};
	  
	  $scope.searchWiki = function(){
		  console.log('searching ' + $scope.text);
		
		getArticle($scope.text)
		.then(function (text) {
              $scope.content = $sce.trustAsHtml(text);
          });	  	  
		   
	  };
	  
	  function getArticle(text) {
          if (cache[$scope.text]){
			  console.log('getting from the cache');
              return $q.when(cache[$scope.text])
		  }
          else {
			  console.log('getting from the web');
              var url = 'http://en.wikipedia.org/w/api.php?action=parse&page=' + text + '&prop=text&section=0&format=json&callback=JSON_CALLBACK';

              return cache[$scope.text] = $http.jsonp(url).then(function (response) {
                  
                  return cache[$scope.text] = response.data.parse.text["*"];
              })

          }
      };

  });
