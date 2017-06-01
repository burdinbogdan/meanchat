angular.module('socketsService', [])
	.service('Socket', ['$rootScope', '$location', '$anchorScroll', 'Chat', 'Auth',
		function($rootScope, $location, $anchorScroll, Chat, Auth) {
			var socket = io();

			socket.on('newMessage', function(message) {
				if (Auth.isLoggedIn()) {
					Chat.pushMessage(message);
					$rootScope.$apply();
					$location.hash('bottomAreaMessage');
					$anchorScroll();
				}
			});

			socket.on('newUser', function(user) {
				if (Auth.isLoggedIn()) {
					Chat.pushUser(user);
					$rootScope.$apply();
				}
			});

			return {
				newMessage: function(message, cb) {
					socket.emit('newMessage', message);
				},
				newUser: function(user, cb) {
					socket.emit('newUser', user);
				}
			}
		}
	]);