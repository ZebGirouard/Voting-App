'use strict';

(function() {
    angular
        .module('clementineApp', ['ngResource', 'ngRoute'])
        .controller('clickController', ['$scope', '$resource', '$route', '$routeParams', function ($scope, $resource, $route, $routeParams) {
            //$scope.clicks = $route.current.params.id;
            var Click = $resource('/api/{id}/surveys');
            //$scope.surveyTotal = 'yo mama';
            $scope.newSurveyShow = false;
            $scope.getSurveys = function() {
                //$scope.surveyTotal = 'yo mama';
                Click.get(function (results) {
                    $scope.surveyTotal = results.length;
                });
            };
            
            $scope.getSurveys();
            
            $scope.addSurvey = function () {
              $scope.newSurveyShow = true;
              Click.save(function () {
                $scope.getSurveys();
              });
              $scope.$apply();
            };
            
            $scope.resetClicks = function () {
                $scope.newSurveyShow = false;
                Click.remove(function() {
                  $scope.getSurveys();
                });
                $scope.$apply();
            };
            
            $scope.addOption = function () {
                $scope.surveyOptions.push({placeholder: 'New Option'});
            };
            
            $scope.surveyOptions = [{
                placeholder: 'Billy'},
            {
                placeholder: 'Jason'}];
            
            $scope.submitPoll = function () {
                alert($scope.survey.name + " submitted with options " + $scope.surveyOptions[0].text);
            };
            
        }]);
})();