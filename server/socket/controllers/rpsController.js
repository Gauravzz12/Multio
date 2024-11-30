const rooms = {};

const rpsController = (io, socket) => {
  socket.on("checkRoom", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) {
      socket.emit("roomStatus", { status: "notFound" });
    } else if (room.players.length >= 2) {
      socket.emit("roomStatus", { status: "full" });
    } else {
      socket.emit("roomStatus", { status: "available" });
    }
  });

  socket.on("joinRoom", ({ roomId, user, rounds = 3 }) => {
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
          rounds: rounds,
          scores: {},
        };
      }
      socket.emit("roomAssigned", { roomId: assignedRoom });
    } else {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          players: [],
          choices: {},
          rounds: rounds,
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
        rounds: rooms[assignedRoom].rounds,
      });
    } else {
      socket.emit("waitingForOpponent");
    }
  });

  socket.on("makeChoice", ({ roomId, choice }) => {
    const room = rooms[roomId];
    if (!room || !room.players.includes(socket.id)) return;

    room.choices[socket.id] = choice;

    if (Object.keys(room.choices).length === 2) {
      const result = determineWinner(room.choices);

      room.players.forEach((playerId) => {
        if (result[playerId] === "You win!") {
          room.scores[playerId] += 1;
        }
      });

      room.players.forEach((playerId) => {
        const opponentId = room.players.find((id) => id !== playerId);
        io.to(playerId).emit("roundOver", {
          result: result[playerId],
          opponentChoice: room.choices[opponentId],
          scores: room.scores,
        });
      });
      const maxScore = Math.max(...Object.values(room.scores));
      if (maxScore === room.rounds) {
        const winner = Object.keys(room.scores).find(
          (key) => room.scores[key] === maxScore
        );
        const loser = Object.keys(room.scores).find(
          (key) => room.scores[key] !== maxScore
        );
        setTimeout(() => {
          io.to(roomId).emit("gameOver", { winnerID: winner, loserID: loser });
          delete rooms[roomId];
        }, 1000);
        return;
      }

      room.choices = {};

      setTimeout(() => {
        io.to(roomId).emit("startGame", {
          scores: room.scores,
          rounds: room.rounds,

        });
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
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
