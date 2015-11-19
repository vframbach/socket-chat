/* server.js */

var express = require('express'),
	app = express(),
	http = require('http').Server(app), // node server
	bodyParser = require('body-parser'),
	io = require('socket.io')(http);



// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true}));

// server static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// homepage route
app.get('/', function (req, res) {
	res.render('index');
});

// connect to socket
io.on('connection', function(socket){
	console.log('user connected');

	// receive and broadcast chat messages
	socket.on('chat message', function(msg) {
		console.log('message:', msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});







// listen on port 3000
http.listen(3000, function() { // node http server
	console.log('server started');
});