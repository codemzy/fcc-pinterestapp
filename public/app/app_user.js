
angular.module('FinterestApp', ['ngRoute'])

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/user_profile.html',
    controller: 'ProfileController'
    })
    // logged in routes
    .when('/profile', {
    templateUrl: '/public/app/views/user_profile.html',
    controller: 'ProfileController'
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