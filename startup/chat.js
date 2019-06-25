const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on('connection', socket => {
  console.log('a user connected to chat')
  
  chatModel
    .find({})
    .sort({ _id: 1 })
    .limit(100)
    .then(res => {
      //send messages to the client
      socket.emit("messageSend", res);
    });

  socket.on("outputMsg", newMsg => {
    new chatModel(newMsg)
      .save()
      .then(msg => {
        io.emit("messageSend", [msg]);
      })
      .catch(err => console.error(err));
  });

  // Handle clear
  socket.on('clear', data => {
    // Remove all chats from collection
    chatModel.remove({}, () => {
      // Emit cleared
      socket.emit('cleared');
    });
  });
});

http.listen(4000, function(){
  console.log('chat listening on *:4000');
});