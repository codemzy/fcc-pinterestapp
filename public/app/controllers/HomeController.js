angular.module('FinterestApp')
.controller('HomeController', ['$scope', 'imgs', function($scope, imgs) {
    $scope.loading = true;
    imgs.getImgs().success(function(data) {
      $scope.loading = false;
      $scope.items = data;
      // apply the masonry grid to the view
      setTimeout(function () {
          $scope.$apply(function () {
            angular.element('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 300
            });
          });
      }, 10);
      // add second load to fix bugs sometimes on first load of layout
      setTimeout(function () {
          $scope.$apply(function () {
            angular.element('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 300
            });
          });
      }, 100);
    });
    $scope.titleShow = false;
    // FUNCTION TO SHOW IMAGE ON MODAL
    $scope.showModal = function(url) {
      $scope.imgShowID = url;
      angular.element('#modalImage').openModal();
    };
    /* REMOVED SO CAN USE NGREPEAT 
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
    REMOVED SO CAN USE NGREPEAT  */
}]);