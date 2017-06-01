angular.module('chatService', [])
	.service('Chat', ['Messages', 'Users', function(Messages, Users) {

		var messages = Messages.getAll();
		var users = Users.getAll();

		function createMessage(text, username, date) {
			return {
				message: text,
				username: username,
				date: date
			};
		}

		function addMessage(text, username, date, cb) {
			if (!text) return;

			var message = createMessage(text, username, date);

			Messages.add(message, function() {
				messages.push(message);
				cb(message);
			});
		}

		function pushMessage(message) {
			if (!messages) {
				messages = Messages.getAll();
			}
			messages.push(message);
		}

		function pushUser(user) {
			if (!users) {
				users = Users.getAll();
			}
			users.push(user);
		}

		return {
			messages: messages,
			users: users,
			createMessage: createMessage,
			addMessage: addMessage,
			pushMessage: pushMessage,
			pushUser: pushUser
		};

	}]);