var express = require('express')();
const app = express()(app);
var http = require('http').createServer(app);
var socket = require('socket.io')(http);
var io = socket.listen(http, { log: false });
var flag = 1;

app.get('/', function(req, res) {

    res.sendFile("./tilak.html");

});

io.sockets.on('connection', function(client) {

    console.log('User connected');

    client.on('join', function(name) {
        client.set('nickname', name);
        console.log("connected...." + name);
    })

    client.on('messages', function(data) {
        client.get('nickname', function(err, name) {
            console.log("Message::" + name + " : " + data.hello);
            client.broadcast.emit('messages', { hello: name + " : " + data.hello });
        })

    });

    client.on('textchanged', function(data) {
        console.log("TextChanged::");
        client.broadcast.emit('textchanged', { hello: data.hello });
    });

});

const PORT = process.env.PORT || 8500;
http.listen(PORT, function() {
    console.log('server are running on the port number', +PORT);
});