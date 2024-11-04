const { Server } = require("socket.io");

const startSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const rooms = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ game, roomId }) => {
      socket.join(roomId);
      if (!rooms[roomId]) {
        rooms[roomId] = { players: [], choices: {} };
      }
      rooms[roomId].players.push(socket.id);

      if (rooms[roomId].players.length === 2) {
        io.to(roomId).emit("startGame");
      }
    });

    socket.on("makeChoice", ({ roomId, choice }) => {
      rooms[roomId].choices[socket.id] = choice;
      if (Object.keys(rooms[roomId].choices).length === 2) {
        const result = determineWinner(rooms[roomId].choices);
        io.to(roomId).emit("gameResult", result);
        rooms[roomId].choices = {};
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.players.includes(socket.id)) {
          room.players = room.players.filter((id) => id !== socket.id);
          delete room.choices[socket.id];
          io.to(roomId).emit("playerLeft");
          if (room.players.length === 0) {
            delete rooms[roomId];
          }
          break;
        }
      }
    });
  });

  const determineWinner = (choices) => {
      const [user1, user2] = Object.keys(choices);
      const choice1 = choices[user1];
      const choice2 = choices[user2];
  
      if (choice1 === choice2) {
        return { result: "It's a tie!", opponentChoice: choice2 };
      } else if (
        (choice1 === "Rock" && choice2 === "Scissors") ||
        (choice1 === "Paper" && choice2 === "Rock") ||
        (choice1 === "Scissors" && choice2 === "Paper")
      ) {
        return { result: `${user1} wins!`, opponentChoice: choice2 };
      } else {
        return { result: `${user2} wins!`, opponentChoice: choice2 };
      }
    };
};

module.exports = startSocketServer;
