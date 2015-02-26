(function (angular) {

    function GuestsController($scope, $http){

        var ws = new WebSocket('ws://f2.smartjs.academy/ws');

        $http.get('http://f2.smartjs.academy/list')
            .success(function(res){
                $scope.elements = res;
            })
            .error(function(err){
                console.log(err);
            });



        $scope.addGuest = function(){

            var newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function ( c ) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

            $scope.elements.push({
                id: newId,
                name: $scope.newGuestName,
                inHall: false
            });

            addToServer(newId, $scope.newGuestName);
            $scope.newGuestName = '';
        };

        $scope.removeGuest = function(id){
            $scope.elements = _.reject($scope.elements, {id: id});
            removeFromServer(id);
        };

        $scope.moveInHall = function(element){
            element.inHall = true;
            updateOnServer(element.id, true);
        };

        $scope.moveFromHall = function(element){
            element.inHall = false;
            updateOnServer(element.id, false);
        };

        var setElementStatus = function(id, inHallStatus){
            for(var i=0; i<$scope.elements.length; i++){
                if ($scope.elements[i].id == id){
                    $scope.elements[i].inHall = inHallStatus;
                    break;
                }
            }
        };

        var addToServer = function(id, name){
            var payload = {
                action: 'add',
                guest: {
                    id: id,
                    name: name
                }
            };
            ws.send(JSON.stringify(payload));
            console.log('addToServer done');
        };

        var removeFromServer = function(id){
            var payload = {
                action: 'remove',
                id: id
            };
            ws.send(JSON.stringify(payload));
            console.log('removeFromServer done');
        };

        var updateOnServer = function(id, inHallStatus){
            var payload = {
                action: 'update',
                guest: {
                    id: id,
                    inHall: inHallStatus
                }
            };
            ws.send(JSON.stringify(payload));
            console.log('updateOnServer done');
        };


        ws.addEventListener('message', function(data){
            console.log('From socket: ');
            console.log(data.data);

            var serverAction = JSON.parse(data.data);
            console.log('server action = '+ serverAction.action);

            $scope.$evalAsync(function(){

            if (serverAction.action === 'add'){
                serverAction.guest.inHall = false;
                $scope.elements.push(serverAction.guest);
                console.log($scope.elements);
            } else if (serverAction.action === 'remove'){
                console.log(serverAction);
                $scope.elements = _.reject($scope.elements, {id: serverAction.id});
            } else if (serverAction.action === 'update'){
                console.log(serverAction);
                setElementStatus(serverAction.guest.id, serverAction.guest.inHall);
            } else {
                console.log('unknown server action');
            }
            });
            //$scope.$apply();
        });

    };

    var app = angular.module("GuestsApp", []);

    app.controller('GuestsController', ["$scope", "$http", GuestsController]);

})(angular);