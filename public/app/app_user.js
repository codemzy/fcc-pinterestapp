
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
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});