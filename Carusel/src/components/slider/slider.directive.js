angular.module('caruselApp').directive('myCarusel', ['$interval', function ($interval) {
	
	

   return {

        transclude: true,

        restrict: 'E',
		
		scope: {
            cards: '=',
            action: '&'
        },
                
        templateUrl: 'components/slider/slider.template.html',

        link: function (scope, el, attrs) {
			
        },

        controller: function ($scope) {
			console.log('in directive');
			console.log($scope.cards);
            
			for(var i=0; i<$scope.cards.length; i++){
				$scope.cards[i].itemIndex = i;
			}
			
			$interval(function(){
				updateItemsIndexes();
			}, 5000);
			
			var updateItemsIndexes = function(){
				for(var i=0; i<$scope.cards.length; i++){
					$scope.cards[i].itemIndex +=1;
					if ($scope.cards[i].itemIndex >= $scope.cards.length){
						$scope.cards[i].itemIndex = 0;
					}
				}
			};
			
        }
    }
}]);