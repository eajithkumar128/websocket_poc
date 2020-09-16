const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var connectionIds = [];

var connectedPages = {};

var messages = {}

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

            if (data.pageId === '1') {
                console.log('joined room 1');
                socket.join('classificationRoom');
            }
            if (data.pageId === '2') {
                console.log('joined room 2');
                socket.join('extractionRoom');
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
                console.log(data.pageId);
                console.log(connectedPages[data.pageId]);
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
        });

        socket.on("disconnect", () => {
            Object.keys(connectedPages).forEach(function (key) {
                if (connectedPages[key].connectedBy === currentUser) {
                    delete connectedPages[key]
                }
            });
            console.log("connection closed");
        });
    });

    socket.on("closeOtherTab", (page) => {
        let prevConnectionId = connectedPages[page.pageId].socketId;
        connectedPages[page.pageId].socketId = socket.id;
        socket.broadcast.to(prevConnectionId).emit('closeCurrentPage');
    });

    socket.on("notifyClassification", (v) => {
        socket.in('classificationRoom').emit('receiveNotify', v);
    });

    socket.on("addRoom", (data) => {
        socket.join(data.page);
        console.log(data.page);
    })

    socket.on("notifyExtraction", (v) => {
        socket.in('extractionRoom').emit('receiveNotify', v);
    });

    socket.on("sendNotification", (v) => {
        if (messages.hasOwnProperty(v.type)) {
            messages[v.type].push(v.msg)
        } else {
            messages[v.type] = []
            messages[v.type].push(v.msg)
        }
        if (v.type === "Broadcast") {
            socket.broadcast.emit('receiveNotification', messages[v.type]);
        } else {
            socket.in(v.type).emit('receiveNotification', messages[v.type]);
        }

    })
});

server.listen(8001, () => {
    console.log("server started at port 8001");
})