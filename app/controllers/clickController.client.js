'use strict';

(function() {
    var app = angular.module('clementineApp', ['ngResource', 'ngRoute']);
        app.controller('surveyController', ['$scope', '$resource', '$route', '$routeParams', '$location', function ($scope, $resource, $route, $routeParams, $location) {
            var Surveys = $resource('/api/{id}/surveys');
            var SurveyRemove = $resource('/api/{id}/surveyRemove');
            $scope.newSurveyShow = false;
            $scope.allSurveysShow = true;
            $scope.survey = {};
            $scope.choice = {};
            var allPath = $location.absUrl().split("/")
            $scope.surveyToShow = allPath[allPath.length - 1]
            $scope.currentId = allPath[allPath.length - 3]
            console.log($scope.surveyToShow);
            var SurveyVote = $resource('/'+$scope.currentId+'/survey/'+$scope.surveyToShow);
            
            $scope.getSurveys = function() {
                Surveys.query(function (results) {
                    $scope.surveyTotal = results.length;
                    $scope.allSurveys = results;
                });
            };
            
            $scope.getSurveys();
            
            $scope.viewNewSurvey = function () {
              $scope.newSurveyShow = true;
              $scope.allSurveysShow = false;
              $scope.linkShow = false;
            };
            
            $scope.viewAllSurveys = function () {
              $scope.newSurveyShow = false;
              $scope.allSurveysShow = true;  
              $scope.linkShow = false;
            };

            $scope.viewLink = function () {
              $scope.newSurveyShow = false;
              $scope.allSurveysShow = false;  
              $scope.linkShow = true;
            };
            
            $scope.deleteSurvey = function (surveyName) {
                var surveyToDelete = {name: surveyName};
                console.log("Deleting " + surveyToDelete);
                SurveyRemove.save(surveyToDelete, function() {
                    $scope.getSurveys();
                });
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
                $scope.newSurveyShow = false;
                $scope.surveyNamePath = encodeURIComponent($scope.survey.name);
                $scope.currentUser = "userIDHere";
                $scope.viewLink();
            };
            
            $scope.submitVote = function () {
                var choice = $scope.choice;
                console.log(choice);
                /*var id = $routeParams.id;
                console.log(id);
                */
                SurveyVote.save(choice, function () {
                    console.log("You voted, dude!");
                });
            };            
            
        }]);
})();