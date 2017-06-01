var mongoose = require('mongoose')
var User = mongoose.model('User');
var Message = require('../models/message');

module.exports.getAllUsers = function(req, res) {
	User.getAll(function(err, users) {
		res.json(users);
	});
}

module.exports.addMessage = function(req, res) {
	var mes = {
		message: req.body.message,
		username: req.body.username,
		date: req.body.date
	};

	Message.add(mes);

	res.json(mes);
};

module.exports.getAllMessages = function(req, res) {
	res.json(Message.getAll());
};