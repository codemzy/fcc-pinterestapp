angular.module('FinterestApp')
.controller('HomeController', ['$scope', function($scope) {
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 200
    });
    $scope.items = [
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9542.jpg" }
        ];
    for (var i = 0; i < $scope.items.length; i++) {
          var $content = $( '<div class="grid-item"><img class="responsive-img" src="' + $scope.items[i].url + '" alt="" /></div>' );
          // add jQuery object
          $('.grid').append( $content ).masonry( 'appended', $content );
    }
}]);