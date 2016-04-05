angular.module('FinterestApp')
.factory('imgs', ['$http', function($http) {
    // add new IMG
    this.addImg = function(data) {
    return $http({
            method  : 'POST',
            url     : '/api/img/add',
            data    : data, 
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
              .success(function(data) {
                return data;
              })
              .error(function(data) {
                return data;
              });
    };
    return this;
}]);