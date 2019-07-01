"use strict";
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const server = require("http").createServer(app);// add the http Server
const chatModel = require("./models/chat");
const mongoose = require("mongoose");
const io = require("socket.io")(server);//socket listen to the server
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));// server listen to port

//--------------------------------------
//socket stuff listen -- get database -- post database
io.set("origins", "*:*");
io.on("connection", function (socket) {
    chatModel
        .find({})
        .sort({ _id: 1 })
        .then(function (res) {
            //send messages to the client
            socket.emit("messageSend", res);
        });

    socket.on("outputMsg", function (newMsg) {
        const user = jwt.verify(newMsg.token, process.env.jwtPrivateKey);
        newMsg.name = user.firstName;

        new chatModel(newMsg)
            .save()
            .then(msg => {
                chatModel
                    .find({})
                    .sort({ _id: 1 })
                    .then(function (res) {
                        //send messages to the client
                        io.emit("messageSend", res);
                    });

            })
            .catch(err => console.error(err));
    });
});
//-------------------------------------




require('./startup/validation')();
require('./startup/asyncErrors')();
require('./startup/db')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/prod')(app);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("./build"))
};