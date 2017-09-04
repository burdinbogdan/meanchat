export default ['$scope', '$route', 'Auth', 'Chat', 'Socket',
	function($scope, $route, Auth, Chat, Socket) {

		$scope.loginStatus = Auth.isLoggedIn();
		$scope.currentUser = Auth.currentUser();

		function sendAuthMessage() {
			var message = $scope.username + " joined us! =)";
			Chat.addMessage(message, "chatBot", Date.now(), Socket.newMessage);
		}

		$scope.login = function(user) {
			Auth.login(user, function() {
				sendAuthMessage();
				$route.reload();
			}, function(err) {
				$scope.errorMessage = err.data.message;
			});
		};

		$scope.registration = function(user) {
			Auth.register(user, function() {
				sendAuthMessage();
				Socket.newUser(user);
				Chat.pushUser(user);
				$route.reload();
			}, function(err) {
				$scope.errorMessage = err.data.message;
			});
		};

		$scope.logout = function() {
			Auth.logout();
			$route.reload();
		};
	}
];