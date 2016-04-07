
angular.module('FinterestApp', ['ngRoute'])

// directive for default img if error
.directive('img', function () {
    return {
        restrict: 'E',        
        link: function (scope, element, attrs) {     
            // show an image-missing image
            element.error(function () {
                var url = '/public/img/finterest_noimg.jpg';
                element.prop('src', url);
                setTimeout(function () {
                    scope.$apply(function () {
                      angular.element('.grid').masonry({
                        // options
                        itemSelector: '.grid-item',
                        columnWidth: 300
                      });
                    });
                }, 200);
            });
        }
    };
})

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/user_myimg.html',
    controller: 'User_ImgMyController'
    })
    .when('/front', {
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