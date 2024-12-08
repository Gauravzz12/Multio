const rooms = {};

const tttController = (io, socket) => {
  const createEmptyBoard = () => {
    return [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const WIN_CONDITIONS = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const assignSymbols = (room) => {
    const [player1, player2] = Object.keys(room.playersInfo);
    if (Math.random() < 0.5) {
      room.symbols[player1] = "X";
      room.symbols[player2] = "O";
      room.currentPlayer = player1;
    } else {
      room.symbols[player1] = "O";
      room.symbols[player2] = "X";
      room.currentPlayer = player2;
    }
  };

  const checkWin = (board, symbol) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      let won = true;
      for (let j = 0; j < WIN_CONDITIONS[i].length; j++) {
        const [x, y] = WIN_CONDITIONS[i][j];
        if (board[x][y] !== symbol) {
          won = false;
          break;
        }
      }
      if (won) return true;
    }
    return false;
  };

  const checkDraw = (board) => {
    return board.flat().every((cell) => cell !== "");
  };
  const nextRound = (roomId) => {
    setTimeout(() => {
      const room = rooms[roomId];
      room.board = createEmptyBoard();
      assignSymbols(room);
      io.to(roomId).emit("startGame", {
        board: room.board,
        currentPlayer: room.currentPlayer,
        symbols: room.symbols,
        scores: room.scores,
        rounds: room.rounds,
        playersInfo: room.playersInfo,
      });
    }, 1000);
  };

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
      const availableRoom = Object.entries(rooms).find(
        ([_, room]) =>
          room.mode === "online" && Object.keys(room.playersInfo).length < 2
      );

      if (availableRoom) {
        assignedRoom = availableRoom[0];
        socket.emit("roomAssigned", { roomId: assignedRoom });
      } else {
        assignedRoom = `room_${Math.random().toString(36).substr(2, 9)}`;
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          currentPlayer: null,
          playersInfo: {},
          symbols: {},
          scores: {},
          rounds: rounds,
          mode: "online",
        };
        socket.emit("roomAssigned", { roomId: assignedRoom });
      }
    } else {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          currentPlayer: null,
          playersInfo: {},
          symbols: {},
          scores: {},
          rounds: rounds,
          mode: "custom",
        };
      }
    }

    const room = rooms[assignedRoom];
    if (Object.keys(room.playersInfo).length >= 2) {
      socket.emit("roomFull");
      return;
    }
    socket.join(assignedRoom);
    room.playersInfo[socket.id] = userInfo;
    room.scores[socket.id] = 0;

    if (Object.keys(room.playersInfo).length === 2) {
      Object.keys(room.scores).forEach((key) => (room.scores[key] = 0));
      assignSymbols(room);
      io.to(assignedRoom).emit("startGame", {
        board: room.board,
        currentPlayer: room.currentPlayer,
        symbols: room.symbols,
        scores: room.scores,
        rounds: room.rounds,
        playersInfo: room.playersInfo,
      });
    } else {
      socket.emit("waitingForOpponent");
    }
  });

  socket.on("makeMove", ({ roomId, x, y }) => {
    const room = rooms[roomId];
    if (!room || Object.keys(room.playersInfo).length < 2) return;

    if (socket.id !== room.currentPlayer) return;
    const symbol = room.symbols[socket.id];
    if (room.board[x][y] === "") {
      room.board[x][y] = symbol;

      if (checkWin(room.board, symbol)) {
        room.scores[socket.id]++;
        io.to(roomId).emit("roundOver", {
          board: room.board,
          winner: socket.id,
          scores: room.scores,
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
            io.to(roomId).emit("gameOver", {
              winnerID: winner,
              loserID: loser,
            });
            delete rooms[roomId];
          }, 1000);
          return;
        }

        nextRound(roomId);
      } else if (checkDraw(room.board)) {
        io.to(roomId).emit("roundOver", {
          board: room.board,
          winner: null,
          scores: room.scores,
        });
        nextRound(roomId);
      } else {
        room.currentPlayer = Object.keys(room.playersInfo).find(
          (id) => id !== socket.id
        );
        io.to(roomId).emit("updateBoard", {
          board: room.board,
          currentPlayer: room.currentPlayer,
        });
      }
    }
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.playersInfo[socket.id]) {
        delete room.playersInfo[socket.id];
        delete room.symbols[socket.id];
        delete room.scores[socket.id];

        if (Object.keys(room.playersInfo).length > 0) {
          room.board = createEmptyBoard();
          room.symbols = {};
          room.scores = {};
          Object.keys(room.playersInfo).forEach((id) => (room.scores[id] = 0));
          io.to(roomId).emit("playerLeft");
          io.to(roomId).emit("waitingForOpponent");
        } else {
          delete rooms[roomId];
        }
        break;
      }
    }
  });
};

module.exports = tttController;
