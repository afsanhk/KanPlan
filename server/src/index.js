const axios = require("axios").default;

const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const socketio = require("socket.io");
const server = require("http").Server(app);

// Socket IO Connections
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("We have a new connection: ", socket.id);

  socket.on("sendMessage", (newMessageObj, callback) => {
    console.log("Websocket server received a new message:", newMessageObj);
    socket.broadcast.emit("message", newMessageObj);
    callback(); // Clears the field and sets history

    axios
      .post(`http://localhost:8001/api/messages/`, newMessageObj)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected for: ", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
