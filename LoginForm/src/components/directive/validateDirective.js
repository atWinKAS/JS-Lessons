angular.module('loginApp').directive('emailValidation', function (validationService) {
    return {

		require: 'ngModel',
        //transclude: true,

        restrict: 'A',
                
        //templateUrl: 'components/MyTabs/mytabs.template.html',

        link: function (scope, el, attrs, ngModelCtrl) {
			console.log('inside directive link...');
			ngModelCtrl.$asyncValidators.emailCheckpush = validationService.validateEmail;
        },
/*
        controller: function ($scope) {
            $scope.items = [];

            this.addTabs = function (tab) {
                $scope.items.push(tab);
            }
        }
		*/
    }
});