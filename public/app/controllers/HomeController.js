angular.module('FinterestApp')
.controller('HomeController', ['$scope', function($scope) {
    $scope.items = [
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_DSC_3274.jpg", name: "Whateves" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_0499.jpg", name: "Whateves" },
            { url: "http://autopilotonlinesuccess.com/wp-content/uploads/2009/11/royalty-free-multimedia.jpg", name: "Whateves" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_1166.jpg", name: "Whateves with a much longer title than before" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_1275.jpg" },
            { url: "http://netdna.webdesignerdepot.com/uploads/2013/11/picjumbo.com_IMG_9998.jpg" },
            { url: "http://autopilotonlinesuccess.com/wp-content/uploads/2009/11/royalty-free-multimedia.jpg" }
        ];
    $scope.titleShow = false;
    /*
    for (var i = 0; i < $scope.items.length; i++) {
          var $content = $( '<div class="grid-item"><img class="responsive-img" src="' + $scope.items[i].url + '" alt="" /></div>' );
          // add jQuery object
          $('.grid').append( $content ).masonry( 'appended', $content );
          if (i == $scope.items.length-1) {
            $('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 200
            });
          }
    }
    */
}]);