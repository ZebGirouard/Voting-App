'use strict';

(function() {
    var app = angular.module('clementineApp', ['ngResource', 'ngRoute']);
        app.controller('clickController', ['$scope', '$resource', '$route', '$routeParams', function ($scope, $resource, $route, $routeParams) {
            var Surveys = $resource('/api/{id}/surveys');
            var SurveyRemove = $resource('/api/{id}/surveyRemove');
            //$scope.surveyTotal = 'yo mama';
            $scope.newSurveyShow = false;
            $scope.allSurveysShow = true;
            $scope.survey = {};
            $scope.getSurveys = function() {
                //$scope.surveyTotal = 'yo mama';
                Surveys.query(function (results) {
                    $scope.surveyTotal = results.length;
                    $scope.allSurveys = results;
                });
            };
            
            $scope.getSurveys();
            
            $scope.viewNewSurvey = function () {
              $scope.newSurveyShow = true;
              $scope.allSurveysShow = false;
            };
            
            $scope.deleteSurvey = function (surveyName) {
                var surveyToDelete = {name: surveyName};
                console.log("Deleting " + surveyToDelete);
                SurveyRemove.save(surveyToDelete, function() {
                    $scope.getSurveys();
                });
            };
            
            $scope.viewResults = function () {
              $scope.newSurveyShow = false;
              $scope.allSurveysShow = true;                
            };
            
            $scope.addOption = function () {
                $scope.survey.surveyOptions.push({placeholder: 'New Option'});
            };
            
            $scope.survey.surveyOptions = [
                {placeholder: 'Billy'},
                {placeholder: 'Jason'}
            ];
            
            $scope.submitPoll = function () {
                var newSurvey = $scope.survey;
                console.log(newSurvey);
                Surveys.save(newSurvey, function () {
                    $scope.getSurveys();
                });
                //$scope.$apply();
                $scope.newSurveyShow = false;
                alert($scope.survey.name + " submitted with options " + $scope.survey.surveyOptions[0].text);
            };
            
        }]);
})();