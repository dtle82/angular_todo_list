/**
 * Created by danh on 11/22/16.
 */
var app = angular.module('myTodoList', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'firebase']);

app.controller('mainController', function (myFirebase) {
    var mc = this;
    this.myArray = [];
    this.statusOptions = ['Not Started','In-Progress','Complete'];

    this.init = function() {
        var promise = myFirebase.readFirebase();

            promise.then(function(response){
                console.log("resolved!",response);
                mc.myArray = [];
                mc.myArray = response;
            }, function(response) {
                console.log("Error",response);
            });
    };

    this.formatDateString = function(param){
        //console.log(param);
        var date = param.split("-").join("/");
        var dateOut = new Date(date);
        //console.log(dateOut);
        return dateOut;
    };

    this.addItem = function() {
        console.log("mc",this.form);
        myFirebase.addObj(this.form);
        this.form = {}
        this.init();
    }

    this.deleteTask = function(idx) {
        myFirebase.delObj(idx);
        this.init();
    };

    this.completeTask = function (idx) {
        myFirebase.updateObj(idx);
        this.init();
    }

    this.init();
});