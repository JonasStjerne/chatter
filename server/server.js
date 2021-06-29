const io = require('socket.io')(3000, {
      cors: {
            origin: "http://localhost:8080",
      }
});

io.on('connection', socket => {
      console.log("connection");
      socket.on("sendMessage", (message) => {
            console.log(socket.id + " just send a message");
            io.emit("newMessage", message, socket.id);
      })
})