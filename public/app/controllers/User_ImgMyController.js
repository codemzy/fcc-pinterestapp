angular.module('FinterestApp')
.controller('User_ImgMyController', ['$scope', 'imgs', function($scope, imgs) {
    imgs.getMyImgs().success(function(data) {
      $scope.items = data;
    });
    $scope.titleShow = false;
}]);