export default ['$scope', '$location', 'Auth', 'Chat', 'Socket',
    function($scope, $location, Auth, Chat, Socket) {

        if (!Auth.isLoggedIn()) {
            $location.path('/');
        }

        $scope.currentUser = Auth.currentUser();
        $scope.messages = Chat.messages;
        $scope.users = Chat.users;

        $scope.sendMessage = function() {
            if (Auth.isLoggedIn()) {

                Chat.addMessage(
                    $scope.textMessage,
                    $scope.currentUser.username,
                    Date.now(),
                    function(message) {
                        Socket.newMessage(message);
                        let el = angular.element(document.querySelector('.messagesArea '))[0];
                        el.scrollTop = el.scrollHeight - el.clientHeight;
                    });

                $scope.textMessage = "";
            } else {
                var text = 'Your session expired. Please sign in again to continue.';
                Chat.pushMessage(Chat.createMessage(text, 'chatBot', Date.now()));
            }
        };

        $scope.isShow = false;
        $scope.showUsers = function() {
            $scope.isShow = !$scope.isShow;
        }

    }
];