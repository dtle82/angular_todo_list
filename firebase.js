/**
 * Created by danh on 11/23/16.
 */
app.service('myFirebase', function($q,$firebaseObject) {
    var self = this;
    // Initialize Firebase
    this.config = {
        apiKey: "AIzaSyCqAUU00FaDuwhkuw5YprrAGzhS-Lz0oyY",
        authDomain: "c11todolist.firebaseapp.com",
        databaseURL: "https://c11todolist.firebaseio.com",
        storageBucket: "c11todolist.appspot.com",
        messagingSenderId: "515680000673"
    };
    firebase.initializeApp(this.config);

    this.fbRef = firebase.database();


    self.users = $firebaseObject(self.fbRef.ref('tasks'));

    this.fbArray = [];

    this.readFirebase = function() {
        var defer = $q.defer();
        self.fbArray = [];
        self.fbRef.ref('tasks').on('value', function (snapshot) {
            var obj = snapshot.val();
            for (var key in obj) {
                var newObj = {
                    task: obj[key].task,
                    status: obj[key].status,
                        id: key,
                    due_date: obj[key].due_date
                }
                console.log("updated!",newObj);
                self.fbArray.push(newObj);
            }
            console.log(self.users.length);
            defer.resolve(self.fbArray);
        });
        return defer.promise;
    };

    this.returnArray = function () {
        return this.fbArray;
    };

    this.addObj = function(obj) {
        /* for some reason, our date from bootstrap UI picker isn't stringify the value of due_date so
        we concatenate to stringify it
         */
        obj.due_date = '' + obj.due_date;
        console.log(obj);
        this.fbRef.ref('tasks').push(obj);
    };

    this.delObj = function(idx) {
        this.fbRef.ref('tasks/'+idx).set(null);
    }

    this.updateObj = function(idx) {
        var updates = {}
        updates['/tasks/'+idx+'/status'] = 'Complete';
        this.fbRef.ref().update(updates);
    }
});