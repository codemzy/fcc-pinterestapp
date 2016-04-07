angular.module('FinterestApp')
.controller('User_ImgMyController', ['$scope', 'imgs', function($scope, imgs) {
    imgs.getMyImgs().success(function(data) {
      $scope.items = data;
      // apply the masonry grid to the view
      setTimeout(function () {
          $scope.$apply(function () {
            angular.element('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 200
            });
          });
      }, 10);
      /* REMOVED SO CAN USE NGREPEAT 
      for (var i = 0; i < $scope.items.length; i++) {
            var $content = $( '<div class="grid-item"><img class="responsive-img" src="' + $scope.items[i].img_url + '" alt="" /></div>' );
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
      
      REMOVED SO CAN USE NGREPEAT */
    });
    $scope.titleShow = false;
}]);