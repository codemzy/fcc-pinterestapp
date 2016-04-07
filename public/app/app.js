angular.module('FinterestApp', ['ngRoute'])

// directive for default img if error
.directive('img', function () {
    return {
        restrict: 'E',        
        link: function (scope, element, attrs) {     
            // show an image-missing image
            element.error(function () {
                var w = element.width();
                var h = element.height();
                // using 20 here because it seems even a missing image will have ~18px width 
                // after this error function has been called
                if (w <= 20) { w = 100; }
                if (h <= 20) { h = 100; }
                var url = '/public/img/finterest_noimg.jpg';
                element.prop('src', url);
            });
        }
    };
})

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/home.html',
    controller: 'HomeController'
    })
    .when('/login', {
    templateUrl: '/public/app/views/login.html'
    })
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});