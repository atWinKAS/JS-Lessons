/*
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function ( c ) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});
*/


var elements = [];
elements.push({id: "1", name: 'A', inHall: false });
elements.push({id: "2", name: 'B', inHall: false });
elements.push({id: "3", name: 'C', inHall: true });
elements.push({id: "4", name: 'D', inHall: true });
elements.push({id: "5", name: 'E', inHall: false });

function createPersonDiv(name, id) {
    var newElement = document.createElement('div');
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

window.onload = function(){
    render();

    document.querySelector('#addGuest').addEventListener('click', function(e){
        e.preventDefault();
        var value = document.querySelector('#name').value;
        if (value !== '') {
            var item = {};
            item.id = 100;
            item.name = value;
            item.inHall = false;
            elements.push(item);
            render();
            document.querySelector('#name').value = '';
        }

    });

    document.querySelector('.invited').addEventListener('click', function(e){
        var item = e.target;
        if (item.tagName === "SPAN"){
            var id = item.getAttribute('data-item');
            console.log(id);

            elements = _.reject(elements, {id: id});
            render();
        }
    });

    document.querySelector('.in-hall').addEventListener('click', function(e){
        console.log(e.target);
    });
};

