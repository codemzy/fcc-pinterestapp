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
              columnWidth: 200
            });
          });
      }, 10);
    });
    $scope.titleShow = false;
}]);