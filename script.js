const { Socket } = require("dgram");

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function sendMessage() {
      let message = document.querySelector("#inputSend").value;

      Socket.emit("newMessage", socket.id)
}

