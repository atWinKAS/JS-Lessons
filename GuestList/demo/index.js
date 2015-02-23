
var newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function ( c ) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});


var ws = new WebSocket('ws://f2.smartjs.academy/ws');


var elements = [];
elements.push({id: "1", name: 'A', inHall: false });
elements.push({id: "2", name: 'B', inHall: false });
elements.push({id: "3", name: 'C', inHall: true });
elements.push({id: "4", name: 'D', inHall: true });
elements.push({id: "5", name: 'E', inHall: false });

function createPersonDiv(name, id) {
    var newElement = document.createElement('div');
    newElement.setAttribute('data-item', id);
    newElement.setAttribute('class', 'item');
    newElement.innerHTML = '<div class="close"><a class="btn btn-danger" href="#" role="button"><span data-item="' + id + '" class="glyphicon glyphicon-remove"></span></a></div>';
    newElement.appendChild(document.createTextNode(name));
    return newElement;
}

var render = function(){
    var invitedDiv = document.querySelector('.invited');
    var inHallDiv = document.querySelector('.in-hall');

    invitedDiv.innerHTML = '';
    inHallDiv.innerHTML= '';

    var items = elements.filter(function(item){
        return !item.inHall;
    });
    items.forEach(function(i){
        invitedDiv.appendChild(createPersonDiv(i.name, i.id));
    });


    items = elements.filter(function(item){
        return item.inHall;
    });

    items.forEach(function(i){
        inHallDiv.appendChild(createPersonDiv(i.name, i.id));
    });

};

var loadData = function(){
    var k = new XMLHttpRequest();
    k.addEventListener('readystatechange', function (state){
        //console.log(state);
        //console.log(k.readyState);
        if (k.readyState == k.DONE){
            //console.log(k.responseText);
            var dataArray = JSON.parse(k.responseText);
            console.log(dataArray);
            elements = [];
            dataArray.forEach(function(item){
                //console.log(item.id);
                elements.push({
                    id: item.id,
                    name: item.name,
                    inHall: item.inHall
                });
            });
            render();
        }
    });

    k.open('GET', 'http://f2.smartjs.academy/list');
    k.send();
    //console.log(k.readyState);
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

var setElementStatus = function(id, inHallStatus){
    for(var i=0; i<elements.length; i++){
        if (elements[i].id == id){
            elements[i].inHall = inHallStatus;
            break;
        }
    }

};

window.onload = function(){



    loadData();

    document.querySelector('#addGuest').addEventListener('click', function(e){
        e.preventDefault();
        var value = document.querySelector('#name').value;
        if (value !== '') {
            var item = {};
            item.id = newId;
            item.name = value;
            item.inHall = false;
            elements.push(item);
            render();
            document.querySelector('#name').value = '';
            console.log(item);

            addToServer(newId, value);
        }

    });

    document.querySelector('.invited').addEventListener('click', function(e){
        var item = e.target;
        console.log(item.tagName);
        if (item.tagName === "SPAN"){
            var id = item.getAttribute('data-item');
            console.log(id);

            elements = _.reject(elements, {id: id});
            removeFromServer(id);
            render();

        } else if (item.tagName === "DIV"){
            console.log('need move to inhall');

            var id = item.getAttribute('data-item');
            console.log(id);

            setElementStatus(id, true);

            updateOnServer(id, true);
            render();
        }
    });

    document.querySelector('.in-hall').addEventListener('click', function(e){
        var item = e.target;
        console.log(e.target);
        if (item.tagName === "DIV") {
            var id = item.getAttribute('data-item');
            console.log(id);
            setElementStatus(id, false);
            updateOnServer(id, false);
            render();
        }
    });

    ws.addEventListener('message', function(data){
        console.log('From socket: ');
        console.log(data.data);

        var serverAction = JSON.parse(data.data);
        console.log('server action = '+ serverAction.action);

        if (serverAction.action === 'add'){
            elements.push(serverAction.guest);
            render();

        } else if (serverAction.action === 'remove'){
            console.log(serverAction);
            elements = _.reject(elements, {id: serverAction.id});
            render();
        } else if (serverAction.action === 'update'){
            console.log(serverAction);
            setElementStatus(serverAction.guest.id, serverAction.guest.inHall);
            render();
        } else {
            console.log('unknown server action');
        }

    });
};

