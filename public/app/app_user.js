
angular.module('FinterestApp', ['ngRoute'])

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/home.html',
    controller: 'HomeController'
    })
    // logged in routes
    .when('/profile', {
    templateUrl: '/public/app/views/user_profile.html',
    controller: 'ProfileController'
    })
    .when('/images/my', {
    templateUrl: '/public/app/views/user_myimg.html',
    controller: 'User_ImgMyController'
    })
    .when('/add', {
    templateUrl: '/public/app/views/user_addimg.html',
    controller: 'User_ImgAddController'
    })
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});