const { Server } = require("socket.io");

const startSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const rooms = {};
  const resetRoomState = (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].choices = {};
      rooms[roomId].ready = {};
    }
  };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ game, roomId }) => {
      if (game === "RPS") {
        let assignedRoom = roomId;
        if (!roomId) {
            for (const [id, room] of Object.entries(rooms)) {
            if (
              room.game === "RPS" &&
              room.players.length < 2 &&
              room.mode === "online"
            ) {
              assignedRoom = id;
              break;
            }
            }
          if (!assignedRoom) {
            assignedRoom = `roomO_${Math.random().toString(36).substr(2, 9)}`;
            rooms[assignedRoom] = {
              game: "RPS",
              players: [],
              choices: {},
              ready: {},
              mode: "online",
              createdAt: Date.now(),
            };
          }
          socket.emit("roomAssigned", { roomId: assignedRoom });
        }

        if (!rooms[assignedRoom]) {
          rooms[assignedRoom] = {
            game: "RPS",
            players: [],
            choices: {},
            ready: {},
            mode: roomId ? "friends" : "online",
            createdAt: Date.now(),
          };
        } else {
          rooms[assignedRoom].choices = {};
        }

        if (rooms[assignedRoom].players.length >= 2) {
          socket.emit("roomFull");
          return;
        }

        socket.join(assignedRoom);
        if (!rooms[assignedRoom].players.includes(socket.id)) {
          rooms[assignedRoom].players.push(socket.id);
        }
        console.log(`Room ID: ${assignedRoom}, Players: ${rooms[assignedRoom].players} `);

        if (rooms[assignedRoom].players.length === 2) {
          io.to(assignedRoom).emit("startGame");
        } else {
          socket.emit("waitingForOpponent");
        }
      }
    });

    socket.on("makeChoice", ({ roomId, choice }) => {
      if (!rooms[roomId] || !rooms[roomId].players.includes(socket.id)) return;
      
      rooms[roomId].choices[socket.id] = choice;
      rooms[roomId].lastActivity = Date.now();
      
      if (rooms[roomId].players.length === 2) {
        const playerChoices = rooms[roomId].choices;
        const allPlayersChoiced = rooms[roomId].players.every(playerId => playerChoices[playerId]);
        
        if (allPlayersChoiced) {
          const result = determineWinner(playerChoices);
          rooms[roomId].players.forEach(playerId => {
            const opponentId = rooms[roomId].players.find(id => id !== playerId);
            io.to(playerId).emit("gameResult", {
              result: result[playerId],
              opponentChoice: playerChoices[opponentId],
            });
          });
          resetRoomState(roomId);
        }
      }
    });

    socket.on("joinExistingRoom", ({ roomId }) => {
      if (rooms[roomId]) {
        socket.join(roomId);
        rooms[roomId].players.push(socket.id);
        if (rooms[roomId].players.length === 2) {
          io.to(roomId).emit("startGame");
        }
      } else {
        socket.emit("roomNotFound");
      }
    });

    socket.on("playAgain", ({ roomId }) => {
      if (!rooms[roomId] || !rooms[roomId].players.includes(socket.id)) return;
      
      rooms[roomId].ready[socket.id] = true;
      rooms[roomId].lastActivity = Date.now();

      const readyPlayers = Object.keys(rooms[roomId].ready).length;
      const totalPlayers = rooms[roomId].players.length;

      if (readyPlayers === totalPlayers) {
        resetRoomState(roomId);
        io.to(roomId).emit("startGame");
      } else {
        socket.emit("waitingForOpponent");
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
      
      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.players.includes(socket.id)) {
          room.players = room.players.filter(id => id !== socket.id);
          delete room.choices[socket.id];
          delete room.ready[socket.id];

          if (room.players.length > 0) {
            resetRoomState(roomId);
            io.to(roomId).emit("playerLeft");
            io.to(roomId).emit("waitingForOpponent");
          } else {
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

    let results = {};
    if (choice1 === choice2) {
      results[user1] = "It's a tie!";
      results[user2] = "It's a tie!";
    } else if (
      (choice1 === "Rock" && choice2 === "Scissors") ||
      (choice1 === "Paper" && choice2 === "Rock") ||
      (choice1 === "Scissors" && choice2 === "Paper")
    ) {
      results[user1] = "You win!";
      results[user2] = "You lose!";
    } else {
      results[user1] = "You lose!";
      results[user2] = "You win!";
    }
    return results;
  };
};

module.exports = startSocketServer;
