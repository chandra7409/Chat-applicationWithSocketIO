const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);


/**
 * Event when the client tries to connect to the
 * server
 */

const users = [];
io.on('connection', (socket) => {

    socket.on('setUserName', (userName) => {
        console.log("Set User Name request " + userName);
        //Write the logic to validate if the userName alread picked
        if (users.indexOf(userName) < 0) {
            console.log('user name doesnot exist');
            //userName is new
            users.push(userName);
            socket.emit('userAllowed', {
                username: userName
            });
        } else {
            console.log('user name already exist');
            socket.emit('userExists', 'username already exists ! Try something new');
        }
    });

    socket.on('msg', (data) => {
        io.sockets.emit('newMessage', data);
    });

    socket.on('disconnect', () => {

    })
})

const PORT = process.env.PORT || 8800;
/**
 * Rendering html
 */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
})

http.listen(PORT, () => {
    console.log("Application started");
    console.log("server running on the port number", +PORT)
})