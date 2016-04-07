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