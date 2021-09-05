const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const socketio = require("socket.io");
const server = require("http").Server(app);

// Socket IO Connections
const io = socketio(server, {
  cors: { origin: "http://localhost:8000", methods: ["GET", "POST", "PUT", "DELETE"] },
});

io.on("connection", (socket) => {
  console.log("We have a new connection!", socket.id);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
