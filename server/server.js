const io = require('socket.io')(3000, {
      cors: {
            origin: "http://localhost:8080",
      }
});

io.on('connection', socket => {
      console.log("connection");
      socket.on("sendMessage", (message, room) => {
            console.log(socket.id + " just sent a message");
            if (room == "") {
                  console.log("Sent to all");
                  io.emit("newMessage", message, socket.id);
            } else {
                  console.log("Sent to room: " + room);
                  socket.to(room).emit("newMessage", message, socket.id);
                  io.to(socket.id).emit("newMessage", message, socket.id)
            }
      })
      socket.on("joinRoom", room => {
            socket.join(room);
      })
})