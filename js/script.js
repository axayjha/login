 var app= angular.module('main', ['ngRoute']);

 app.config(function($routeProvider) {
     $routeProvider.when('/', {
         templateUrl: './components/home.html',
         controller: 'homeCtrl'
     }).when('/login', {
        templateUrl: './components/login.html',
        controller: 'loginCtrl'
     }).when('/dashboard', {
        resolve: {
            check: function($location, user) {
                if(!(user.isUserLoggedIn())) {
                    $location.path('/login');
                }
            },
        },
        templateUrl: './components/dashboard.html',
        controller: 'dashboardCtrl'
     }).otherwise ({
         template: '404'
     })
 });

 app.service('user', function() {
    var username;
    var id;
    var loggedin = false;
    this.setName = function(name) {
        username = name;
    };
    this.getName = function() {
        return username;
    };
    this.setID = function(userid) {
        id = userid;
    };
    this.getID = function() {
        return id;
    };
    this.isUserLoggedIn = function() {
        return loggedin;
    };
    this.userLoggedIn = function() {
        loggedin = true;
    };
 })

app.controller('homeCtrl', function($scope, $location){
    $scope.goToLogin = function(){
        $location.path('/login');
    }

    $scope.register = function() {
        $location.path('/register');
    }
});

app.controller('loginCtrl', function($scope, $http, user, $location){
    $scope.login = function(){
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: 'http://localhost/login/php/server.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username='+username+"&password="+password
        }).then(function(response){
            if(response.data.status == 'loggedin') {
                user.userLoggedIn();
                user.setName(response.data.user);
                $location.path('/dashboard');
            } else {
                alert('invalid login');
            }
        })
    }

});

app.controller('dashboardCtrl', function($scope, user){
    $scope.user = user.getName();
});