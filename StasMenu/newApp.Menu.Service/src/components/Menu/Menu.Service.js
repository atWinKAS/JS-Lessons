/// <reference path="D:\WORK\GIT\newApp.Menu.Service\bower_components\angular\angular.js">
angular.module('menuModule', []).provider('Menu', function () {
    var items = [];

    this.$get = function () {
        return {
            getItems: function(){
                //return items;
                return items.sort(compareItems);
            }
        };
    };

    this.addItem = function (obj) {
        items.push(obj);
    }

    this.getItemsOnConfig = function () {
        return items;
    }

})

function compareItems(a, b) {
    if (a.title > b.title) {
        return 1;
    }else if (a.title < b.title) {
        return -1;
    };
    return 0;
};