// set up ========================

var config = require('./configuration');
var express = require('express');
var http = require('http');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || config.PORT || 8080;
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');

// configuration =================

var db = mongoose.connect(config.connectionDBString); 

app.use(express.static('./public'));                 
app.use(morgan(config.envStatus));                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(passport.initialize());

var server = http.createServer(app);
var io = require('socket.io').listen(server);


require('./app/models/user')
require('./app/config/passport');

require('./app/sockets')(io);
require('./app/routes')(app, __dirname);


// start app ======================================
server.listen(port);
console.log("App listening on port" + port);