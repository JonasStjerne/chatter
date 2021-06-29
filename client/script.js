import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const inputField = document.getElementById("inputSend");

inputField.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("sendIcon").click();
      }
});

socket.on("connect", () => {
      console.log("This socket id is: " + socket.id)

      window.sendMessage = function(event) {
            var message = document.querySelector("#inputSend").value;
            if (message != "") {
                  socket.emit("sendMessage", (message));
                  document.querySelector("#inputSend").value = "";
            }
      } 

      socket.on("newMessage", (message, socketSenderId) => {
            printMessage(message, socketSenderId);
      })

      window.printMessage = function(message, socketSenderId) {
            const messagebox = document.querySelector("#messages");
            if (socketSenderId == socket.id) {
                  messagebox.innerHTML += "<div style='overflow: auto;'><small style='float: right;'>" + socketSenderId + "</small><br><div style='float: right;'>" + message + "</div></div>";
            } else {
                  messagebox.innerHTML += "<div><small>" + socketSenderId + "</small><br><div>" + message + "</div></div>";
            }
      }
})
