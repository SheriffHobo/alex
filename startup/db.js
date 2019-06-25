const mongoose = require('mongoose');
const seed = require('./seeds');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { Shelf } = require('../models/shelf');
const { Item } = require('../models/item');
const io = require("socket.io");

const dbName = process.env.DB_NAME;

module.exports = function () {
  mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true })
    .then(async () => {
      console.log(`Connected to ${dbName}...`);

      io.on("connection", function (socket) {
        chatModel
          .find({})
          .sort({ _id: 1 })
          .limit(100)
          .then(function (res) {
            //send messages to the client
            socket.emit("messageSend", res);
          });

        //   console.log(socket.id);

        socket.on("outputMsg", function (newMsg) {
          new chatModel(newMsg)
            .save()
            .then(msg => {
              io.emit("messageSend", [msg]);
            })
            .catch(err => console.error(err));
        });

        // Handle clear
        socket.on('clear', function (data) {
          // Remove all chats from collection
          chatModel.remove({}, function () {
            // Emit cleared
            socket.emit('cleared');
          });
        });
      });

      const users = await User.find();
      if (!users.length) seed();
    })
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}