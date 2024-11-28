const { Server } = require("socket.io");
const rpsController = require("./controllers/rpsController");
const tttController = require("./controllers/tttController");

const startSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173","https://multio.netlify.app"],
      methods: ["GET", "POST"],
    },
  });

  const rpsNamespace = io.of("/rps");
  const tttNamespace = io.of("/ttt");

  rpsNamespace.on("connection", (socket) => {
    rpsController(rpsNamespace, socket);
  });

  tttNamespace.on("connection", (socket) => {
    tttController(tttNamespace, socket);
  });

};

module.exports = startSocketServer;