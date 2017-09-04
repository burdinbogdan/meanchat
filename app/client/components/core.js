'use strict';

import  './../bower_components/bootstrap/dist/css/bootstrap.min.css';
import  './../bower_components/bootstrap/dist/css/bootstrap-theme.min.css';
import '../styles/main.css';

import bootstrap from './../bower_components/bootstrap/dist/js/bootstrap.min.js';

import angular from './../bower_components/angular';
import ngRoute from './../bower_components/angular-route';
import ngResource from './../bower_components/angular-resource';
import messagesRes from './services/resources/messages';
import usersRes from './services/resources/users';
import socketsServ from './services/socketsServ';
import authentication from './authentication';
import chat from './chat';

angular.module('chatApp', [
	ngRoute,
	ngResource,
	messagesRes,
	usersRes,
	socketsServ,
	authentication,
	chat
	])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			template: require('./authentication/authentication.html'),
			controller: 'authenticationCtrl'
		}).when('/chat', {
			template: require('./chat/chat.html'),
			controller: 'chatCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	}]);