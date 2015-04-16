(function () {
    var validationService = function ($timeout, $q) {
        
		this.validateEmail = function (email) {
            console.log('validate email=[' + email + '] in service');
			
			return $timeout(callAtTimeout, 3000);
        };
		
		function callAtTimeout() {
			console.log('Timeout occurred');
			var num = Math.random();
			console.log(num);
			var result = num < 0.5 ? true : false;
			console.log(result);
			return result || $q.reject();
		}

    };

    angular.module('loginApp').service('validationService', ['$timeout', '$q', validationService]);
}());