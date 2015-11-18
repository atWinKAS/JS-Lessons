(function () {
	var addressBookService = function($q){

		function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '' + s4() + '' + s4() + '' +
    s4() + '' + s4() + s4() + s4();
};

		
		var people = [
      {
		  'id': guid(),
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'user1@mail.com',
        'phone': '+38050'
      },
	  {
		  'id': guid(),
        'firstName': 'Jane',
        'lastName': 'Doe',
        'email': 'user2@mail.com',
        'phone': '+38066'
      }
    ];
	
		this.list = function(){
				console.log('getting all peope...');
				return $q(function(resolve, reject){
					resolve(people);
				}); 
		};
		
		this.get = function(id){
			console.log('getting people by ' + id);
			return $q(function(resolve, reject){				
				resolve(_.find(people, {'id': id}));
			});
		};
		
		this.create = function(data){
			console.log('adding new man in service: ');
			console.log(data);
			return $q(function(resolve, reject){
				data.id = guid();
				people.push(data);
				resolve(data);
			});
		};
		
		this.update = function(data){
			for(var i=0; i<people.length; i++){
				if (people[i].id == data.id){
					console.log('need to update ' + i);
					console.log(people[i]);
					return $q(function(resolve, reject){
						resolve(people[i]);
					})
				}
			}
		}
		
		this.delete = function(id){
			
		}	
	};
	
	angular.module('addressBookApp').service('addressBookService', addressBookService);
	
}());