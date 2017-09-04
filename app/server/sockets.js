module.exports = function(io) {

    var headers = [
        'newMessage',
        'newUser'
    ]

    io.on('connection', function(socket) {
        for (var h in headers) {
            (function(headers) {
                socket.on(headers, function(data) {
                    socket.broadcast.emit(headers, data);
                });
            })(headers[h]);
        }
    });

    // io.on('connection', function (socket) {
    //  console.log(socket);
    //     socket.on('newMessage', function (message) {
    //         socket.broadcast.emit('newMessage',message);
    //     });
    //     socket.on('newUser', function (user) {
    //         socket.broadcast.emit('newUser',user);
    //     });
    // });
};