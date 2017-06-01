var authCtrl = require('./controllers/authCtrl');
var chatCtrl = require('./controllers/chatCtrl');

module.exports = function(app, appDirname) {

    app.post('/api/users/register', authCtrl.register);

    app.post('/api/users/login', authCtrl.login);

    app.get('/api/users/getAll', chatCtrl.getAllUsers);

    app.post('/api/messages/add', chatCtrl.addMessage);

    app.get('/api/messages/getAll', chatCtrl.getAllMessages);

    app.get('*', function(req, res) {
        res.sendFile(appDirname + '/public/index.html');
    });
};