'use strict';

import authenticationCtrl from './authenticationCtrl.js';
import authenticationServ from './authenticationServ.js';

export default angular.module('chatApp.authentication', [])
	.controller('authenticationCtrl', authenticationCtrl)
	.service('Auth', authenticationServ)
	.name;