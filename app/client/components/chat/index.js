'use strict';

import chatCtrl from './chatCtrl.js';
import chatServ from './chatServ.js';

export default angular.module('chatApp.chat', [])
	.controller('chatCtrl', chatCtrl)
	.service('Chat', chatServ)
	.name;