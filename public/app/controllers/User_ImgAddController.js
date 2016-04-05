angular.module('FinterestApp')
.controller('User_ImgAddController', ['$scope', 'imgs', function($scope, imgs) {
    $scope.formData = {};  
    $scope.addImage = function() {
      if ($scope.formData.imgTitle.match(/[^a-z\s0-9?]/ig)) {
        $scope.helpForm = 'Invalid Information. Please remove punctuation (valid characters are letters, numbers, spaces.)';
      } else {
        var imgData = $.param($scope.formData);
        imgs.addImg(imgData).success(function(data) {
          $scope.helpForm = data.message;
        });
      }
    };
}]);