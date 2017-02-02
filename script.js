/**
 * Created by danh on 11/22/16.
 */
var app = angular.module('myTodoList', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'firebase']);

app.controller('mainController', function ($scope, myFirebase) {
    var mc = this;
    this.myArray = [];
    this.statusOptions = ['Not Started','In-Progress','Complete'];
    this.event = false;

    this.init = function() {
        myFirebase.readFirebase().on('value', function(snapshot) {
            mc.update(myFirebase.buildArray(snapshot.val()));
        });
    };

    this.update = function(data) {
        if(!this.event) {
            $scope.$apply(function() {
                mc.myArray = data;
            });
        } else {
            mc.myArray = data;
            this.event = false;
        }
    };

    this.formatDateString = function(param){
        //console.log(param);
        var date = param.split("-").join("/");
        var dateOut = new Date(date);
        //console.log(dateOut);
        return dateOut;
    };

    this.addItem = function() {
        this.event = true;
        console.log("mc",this.form);
        myFirebase.addObj(this.form);
        this.form = {};
    };

    this.deleteTask = function(idx) {
        this.event = true;
        myFirebase.delObj(idx);
    };

    this.completeTask = function (idx) {
        this.event = true;
        myFirebase.updateObj(idx);
    };

    this.init();
});