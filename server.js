"use strict";

require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const chatModel = require("./models/chat");
const mongoose = require("mongoose");
const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(8081);


require('./startup/validation')();
require('./startup/asyncErrors')();
require('./startup/db')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/prod')(app);

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });
// app.use(express.static("public"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));