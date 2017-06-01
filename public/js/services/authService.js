angular.module('authService', [])
  .service('Auth', ['$http', '$window', 'Users', function($http, $window, Users) {

    function saveToken(token) {
      $window.localStorage['token'] = token;
    };

    function getToken() {
      return $window.localStorage['token'];
    };

    function isLoggedIn() {
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now();
      } else {
        return false;
      }
    };

    function currentUser() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          username: payload.username
        };
      }
    };

    function register(user, cb, errcb) {
      return Users.register(user, function(res) {
        saveToken(res.token);
        cb();
      }, function(err) {
        errcb(err);
      });
    };

    function login(user, cb, errcb) {
      return Users.login(user, function(res) {
        saveToken(res.token);
        cb();
      }, function(err) {
        errcb(err);
      });
    };

    function logout() {
      $window.localStorage.removeItem('token');
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      register: register,
      login: login,
      logout: logout
    };
  }]);