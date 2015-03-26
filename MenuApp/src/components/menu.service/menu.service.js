angular.module('menu.service', []).provider('menu', function(){
	var menuItems = [{title: 'M1', state: 'S1'}, {title: 'M2', state: 'S2'}];
	
	this.$get = function() {
		return {
			getItems: function(){
				return menuItems;
			}
		}
	};
	
	this.addItem = function(item){
		menuItems.push(item);
	};
});