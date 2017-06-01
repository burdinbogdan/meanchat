angular.module('chatApp', [
		'ngRoute',
		'ngResource',
		'controllers',
		'authService',
		'socketsService',
		'chatService',
		'resService',
	])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			templateUrl: 'views/auth.html',
			controller: 'authController'
		}).when('/chat', {
			templateUrl: 'views/chat.html',
			controller: 'chatController'
		}).otherwise({
			redirectTo: '/'
		});
	}]);