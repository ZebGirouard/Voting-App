'use strict';

(function() {
    angular
        .module('clementineApp', ['ngResource', 'ngRoute'])
        .controller('clickController', ['$scope', '$resource', '$route', '$routeParams', function ($scope, $resource, $route, $routeParams) {
            //$scope.clicks = $route.current.params.id;
            var Click = $resource('/api/{id}/clicks');
            
            $scope.getClicks = function() {
                Click.get(function (results) {
                    $scope.clicks = results.clicks;
                });
            };
            
            $scope.getClicks();
            
            $scope.addClick = function () {
                Click.save(function () {
                    $scope.getClicks();
                });
            };
            $scope.resetClicks = function () {
                Click.remove(function() {
                    $scope.getClicks();
                });
            };            
            
        }]);
})();