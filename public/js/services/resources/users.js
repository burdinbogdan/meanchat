angular.module('resService', [])
    .factory('Users', ['$resource', function($resource) {
        return $resource('api/users/:action', null, {
            getAll: {method:'GET', params:{action:'getAll'}, isArray: true},
            login: {method:'POST', params:{action:'login'}},
            register: {method:'POST', params:{action:'register'}},
        });
    }]);