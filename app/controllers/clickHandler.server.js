'use strict';

var Users = require('../models/users.js');

function ClickHandler () {
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
	
	this.addSurvey = function (req, res) {
		Users
		//this should be find and insert, not find and update
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $push: { 'surveys': 'test' } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.surveys);
				}
			);		
	};
	
	this.getSurveys = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				console.log('survey results...');
				console.log(result.surveys);
				res.json(result.surveys);
			});
	};
}

module.exports = ClickHandler;
