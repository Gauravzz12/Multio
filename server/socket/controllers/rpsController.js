const rooms = {};

const rpsController = (io, socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    let assignedRoom = roomId;

    if (!assignedRoom) {
      for (const [id, room] of Object.entries(rooms)) {
        if (room.mode === "online" && room.players.length < 2) {
          assignedRoom = id;
          break;
        }
      }
      if (!assignedRoom) {
        assignedRoom = `room_${Math.random().toString(36).substr(2, 9)}`;
        rooms[assignedRoom] = {
          players: [],
          choices: {},
          mode: "online",
          scores: {},
        };
      }
      socket.emit("roomAssigned", { roomId: assignedRoom });
    } else {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          players: [],
          choices: {},
          mode: "custom",
          scores: {},
        };
      } else if (rooms[assignedRoom].mode !== "custom") {
        socket.emit("roomNotFound");
        return;
      }
    }

    if (rooms[assignedRoom].players.length >= 2) {
      socket.emit("roomFull");
      return;
    }

    socket.join(assignedRoom);
    if (!rooms[assignedRoom].players.includes(socket.id)) {
      rooms[assignedRoom].players.push(socket.id);
      rooms[assignedRoom].scores[socket.id] = 0;
    }

    if (rooms[assignedRoom].players.length === 2) {
      io.to(assignedRoom).emit("startGame", {
        scores: rooms[assignedRoom].scores,
      });
    } else {
      socket.emit("waitingForOpponent");
    }
  });

  socket.on("makeChoice", ({ roomId, choice }) => {
    if (!rooms[roomId] || !rooms[roomId].players.includes(socket.id)) return;

    rooms[roomId].choices[socket.id] = choice;

    if (Object.keys(rooms[roomId].choices).length === 2) {
      const result = determineWinner(rooms[roomId].choices);

      rooms[roomId].players.forEach((playerId) => {
        if (result[playerId] === "You win!") {
          rooms[roomId].scores[playerId] += 1;
        }
      });

      rooms[roomId].players.forEach((playerId) => {
        const opponentId = rooms[roomId].players.find((id) => id !== playerId);
        io.to(playerId).emit("gameResult", {
          result: result[playerId],
          opponentChoice: rooms[roomId].choices[opponentId],
          scores: rooms[roomId].scores,
        });
      });

      rooms[roomId].choices = {};

      setTimeout(() => {
        io.to(roomId).emit("startGame", {
          scores: rooms[roomId].scores,
        });
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);

    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.players.includes(socket.id)) {
        room.players = room.players.filter((id) => id !== socket.id);

        delete room.choices[socket.id];

        if (room.players.length > 0) {
          delete room.scores[socket.id];
          rooms[roomId].scores = {};
          room.players.forEach((playerId) => {
            rooms[roomId].scores[playerId] = 0;
          });
          io.to(roomId).emit("playerLeft");
          io.to(roomId).emit("scoresReset");
          io.to(roomId).emit("waitingForOpponent");
        } else {
          delete rooms[roomId];
        }
        break;
      }
    }
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

module.exports = rpsController;
