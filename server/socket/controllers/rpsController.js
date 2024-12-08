const rooms = {};

const rpsController = (io, socket) => {
  socket.on("checkRoom", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) {
      socket.emit("roomStatus", { status: "notFound" });
    } else if (Object.keys(room.playersInfo).length >= 2) {
      socket.emit("roomStatus", { status: "full" });
    } else {
      socket.emit("roomStatus", { status: "available" });
    }
  });

  socket.on("joinRoom", ({ roomId, userInfo, rounds = 3 }) => {
  
    let assignedRoom = roomId; 
    if (!assignedRoom) {
      const availableRoom = Object.entries(rooms).find(([_, room]) => 
        room.mode === "online" && 
        Object.keys(room.playersInfo).length < 2
      );
      
      if (availableRoom) {
        assignedRoom = availableRoom[0];
        socket.emit("roomAssigned", { roomId: assignedRoom });
      } else {
        assignedRoom = `room_${Math.random().toString(36).substr(2, 9)}`;
        rooms[assignedRoom] = {
          playersInfo: {},
          choices: {},
          rounds: rounds,
          mode: "online",
          scores: {}
        };
        socket.emit("roomAssigned", { roomId: assignedRoom });
      }
    } else {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          playersInfo: {},
          choices: {},
          rounds: rounds,
          mode: "custom",
          scores: {}
        };
      }
    }

    let room = rooms[assignedRoom];
    if (Object.keys(room.playersInfo).length >= 2) {
      socket.emit("roomFull");
      return;
    }

    socket.join(assignedRoom);
    room.playersInfo[socket.id] = userInfo;
    room.scores[socket.id] = 0; 


    if (Object.keys(room.playersInfo).length === 2) {
      Object.keys(room.scores).forEach(key => room.scores[key] = 0);
      io.to(assignedRoom).emit("startGame", {
        scores: room.scores,
        rounds: room.rounds,
        playersInfo: room.playersInfo,
      });
    } else {
      socket.emit("waitingForOpponent");
    }
  });

  socket.on("makeChoice", ({ roomId, choice }) => {
    const room = rooms[roomId];
    if (!room || !room.playersInfo[socket.id]) return;

    room.choices[socket.id] = choice;

    if (Object.keys(room.choices).length === 2) {
      const result = determineWinner(room.choices);

      Object.keys(room.playersInfo).forEach((playerId) => {
        if (result[playerId] === "You win!") {
          room.scores[playerId] += 1;
        }
      });

      Object.keys(room.playersInfo).forEach((playerId) => {
        const opponentId = Object.keys(room.playersInfo).find(
          (id) => id !== playerId
        );
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
          playersInfo:room.playersInfo,
        });
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.playersInfo[socket.id]) {
        delete room.playersInfo[socket.id];
        delete room.choices[socket.id];
        delete room.scores[socket.id];

        if (Object.keys(room.playersInfo).length > 0) {
          room.choices = {};
          room.scores = {};
          Object.keys(room.playersInfo).forEach(id => room.scores[id] = 0);
          io.to(roomId).emit("playerLeft");
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
    const winningCombos = {
      'Rock': 'Scissors',
      'Paper': 'Rock',
      'Scissors': 'Paper'
    };
    
    const choice1 = choices[user1];
    const choice2 = choices[user2];

    if (choice1 === choice2) return { [user1]: "It's a tie!", [user2]: "It's a tie!" };
    
    const user1Wins = winningCombos[choice1] === choice2;
    return {
      [user1]: user1Wins ? "You win!" : "You lose!",
      [user2]: user1Wins ? "You lose!" : "You win!"
    };
  };
};

module.exports = rpsController;
