angular.module('newapp').directive('menu', function(){
	return {
		restrict: 'E',
		scope: {
			items: "="	,
			onClose: "@"
		},
		link: function(scope, el){
			console.log('in link');
			console.log(scope.items);

			
			
		},	
		templateUrl: 'components/menu.service/menu.html'
	}
});