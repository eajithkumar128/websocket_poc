const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var connectionIds = [];

var connectedPages = {};

var currentUser = ""

io.on('connection', socket => {
    connectionIds.push(socket);
    console.log("Socket connection created " + socket);

    //Send message to client

    //Listen to message
    socket.on('checkSend', data => {
        // socket.emit('receiveMessage', "Fine How about you");
        socket.broadcast.emit('broadcast', 'hello friends!');
    });

    //check connection available
    socket.on("checkConnectionAvailable", data => {
        currentUser = data.username
        if (!connectedPages.hasOwnProperty(data.pageId)) {
            connectedPages[data.pageId] = {
                status: "connected",
                connectedBy: data.username,
                socketId: socket.id
            }
        } else {
            if (connectedPages[data.pageId].connectedBy === data.username) {
                if (connectedPages[data.pageId].socketId === socket.id) {
                    socket.emit("alreadyConnected", {
                        connected: true,
                        sameUser: true,
                        sameTab: true,
                        connectedBy: connectedPages[data.pageId].connectedBy
                    })
                } else {
                    socket.emit("alreadyConnected", {
                        connected: true,
                        sameUser: true,
                        sameTab: false,
                        connectedBy: connectedPages[data.pageId].connectedBy
                    })
                }
            } else {
                socket.emit("alreadyConnected", {
                    connected: true,
                    sameUser: false,
                    sameTab: false,
                    connectedBy: connectedPages[data.pageId].connectedBy
                })
            }
        }
        socket.emit("alreadyConnected", {
            connected: false,
            sameUser: false,
            sameTab: false,
            connectedBy: ""
        })
    });

    socket.on("closeOtherTab", (page) => {
        let prevConnectionId = connectedPages[page.pageId].socketId;
        connectedPages[page.pageId].socketId = socket.id;
        socket.broadcast.to(prevConnectionId).emit('closeCurrentPage');
    });

    socket.on('disconnect', () => {
        Object.keys(connectedPages).forEach(function (key) {
            if (connectedPages[key].connectedBy === currentUser) {
                delete connectedPages[key]
            }
        });
        console.log("connection closed");
    })
});




server.listen(8001, () => {
    console.log("server started at port 8001");
})