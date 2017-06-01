//Simple message store (stub)
var messages = [];

module.exports.getAll = function() {
	return messages;
};

module.exports.add = function(message) {
	messages.push(message);
};