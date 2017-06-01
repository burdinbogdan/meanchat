angular.module('controllers')
    .controller('chatController', ['$scope', '$location', '$anchorScroll', 'Auth', 'Chat', 'Socket',
        function($scope, $location, $anchorScroll, Auth, Chat, Socket) {

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
                            $location.hash('bottomAreaMessage');
                            $anchorScroll();
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
    ]);