'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.addSurvey = function (req, res) {
		var surveyName = req.body.name;
		var surveyOptions = req.body.surveyOptions;
		var surveyObject = {
			surveyName: surveyName,
			surveyOptions: {}
		};
		function pushToObject(element, index, array) {
			var optionName = element.text;
			surveyObject.surveyOptions[optionName] = 0;
		}
		surveyOptions.forEach(pushToObject);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'surveys': surveyObject } })
			.exec(function (err, result) {
					if (err) { 
						throw err; 
					}
					res.json(result);
				}
			);		
	};
	
	this.addVote = function (req, res) {
		var choice = req.body.text;
		console.log(choice);
		var userId = req.params.id;
		console.log(userId);
		var surveyName = req.params.surveyName;
		console.log(surveyName);
		var voteObject = {};
		voteObject["surveys.$.surveyOptions."+choice] = 1;
		console.log(voteObject);
		Users
			.findOneAndUpdate({ 'github.id': userId, "surveys.surveyName" : surveyName}, { $inc : voteObject})
			.exec(function (err, result) {
					if (err) { 
						throw err; 
					}
					res.json(result);
				}
			);		
	};
	
	this.deleteSurvey = function (req, res) {
		var surveyName = req.body.name;
		console.log(surveyName);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $pull: {'surveys': {'surveyName': surveyName}}})
			.exec(function (err, result) {
					if (err) { 
						throw err; 
					}
					res.json(result);
				}
			);			
	}
	
	this.getOneSurvey = function (req, res) {
		console.log('Getting a survey');
		res.json({test: 'test'});	
	};
	
	this.getSurveys = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { 
					throw err;
				}
				res.json(result.surveys);
			});
	};
}

module.exports = ClickHandler;
