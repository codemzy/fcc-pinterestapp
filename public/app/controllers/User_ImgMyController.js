angular.module('FinterestApp')
.controller('User_ImgMyController', ['$scope', 'imgs', function($scope, imgs) {
    $scope.loading = true;
    imgs.getMyImgs().success(function(data) {
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
    });
    $scope.titleShow = false;
    angular.element('.modal-trigger').leanModal();
    // FUNCTIONS TO DELETE IMG
    $scope.deleteModal = function(url) {
      $scope.deleteRequestID = url;
      angular.element('#modalDelete').openModal();
    };
    // delete img
    $scope.deleteImage = function(id) {
        var deleteIndex =  function(index) {
            $scope.items.splice(index, 1);
        };
        // to do the other bit of front end
        // send the img data to the back end
        imgs.deleteIMG(id).success(function(data){
            $scope.message = data.message;
            // remove the book
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].img_url == id) {
                    $scope.items[i].deleteRequest = false;
                    deleteIndex(i);
                }
            }
        });
    };
}]);