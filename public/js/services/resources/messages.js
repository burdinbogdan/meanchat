angular.module('resService')
    .factory('Messages', ['$resource', function($resource) {
        return $resource('api/messages/:action', null, {
            getAll: {method:'GET', params:{action:'getAll'}, isArray: true},
            add: {method:'POST', params:{action:'add'}}
        });
    }]);