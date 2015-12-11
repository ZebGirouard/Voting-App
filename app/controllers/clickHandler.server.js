'use strict';

var Users = require('../models/users.js');

function ClickHandler () {
	/*
	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'surveys.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.surveys);
				}
			);
	};
	*/
	this.addSurvey = function (req, res) {
		var surveyName = req.body.name;
		var surveyOptions = req.body.surveyOptions;
		var surveyObject = {
			surveyName: surveyName,
			surveyOptions: []
		};
		function pushToObject(element, index, array) {
			surveyObject.surveyOptions.push({optionID: index, option: element.text, votes: 0});
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
		/*
		Users
			.findOneAndUpdate({ 'github.id': userId }, { $inc: { 'surveys': surveyObject } })
			.exec(function (err, result) {
					if (err) { 
						throw err; 
					}
					res.json(result);
				}
			);		
			*/
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
