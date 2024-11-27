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
    const [player1, player2] = room.players;
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
      });
    }, 1000);
  };
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
          board: createEmptyBoard(),
          currentPlayer: null,
          players: [],
          symbols: {},
          scores: {},
          mode: "online",
        };
      }
      socket.emit("roomAssigned", { roomId: assignedRoom });
    } else {
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          currentPlayer: null,
          players: [],
          symbols: {},
          scores: {},
          mode: "friends",
        };
      }
    }
    const room = rooms[assignedRoom];
    if (room.players.length >= 2) {
      socket.emit("roomFull");
      return;
    }
    socket.join(assignedRoom);
    room.players.push(socket.id);
    room.scores[socket.id] = 0;
    if (room.players.length === 1) {
      socket.emit("waitingForOpponent ");
    } else if (room.players.length === 2) {
      assignSymbols(room);
      io.to(assignedRoom).emit("startGame", {
        board: room.board,
        currentPlayer: room.currentPlayer,
        symbols: room.symbols,
        scores: room.scores,
      });
    }
  });

  socket.on("makeMove", ({ roomId, x, y }) => {
    const room = rooms[roomId];
    if (!room || room.players.length < 2) return;

    if (socket.id !== room.currentPlayer) return;
    const symbol = room.symbols[socket.id];
    if (room.board[x][y] === "") {
      room.board[x][y] = symbol;

      if (checkWin(room.board, symbol)) {
        room.scores[socket.id]++;
        io.to(roomId).emit("gameOver", {
          board: room.board,
          winner: socket.id,
          scores: room.scores,
        });
        nextRound(roomId);
      } else if (checkDraw(room.board)) {
        io.to(roomId).emit("gameOver", {
          board: room.board,
          winner: null,
          scores: room.scores,
        });
        nextRound(roomId);
      } else {
        room.currentPlayer = room.players.find((id) => id !== socket.id);
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
      if (room.players.includes(socket.id)) {
        room.players = room.players.filter((id) => id !== socket.id);
        delete room.symbols[socket.id];
        if (room.players.length > 0) {
          delete room.scores[socket.id];
          rooms[roomId].scores = {};
          io.to(roomId).emit("playerLeft");
          io.to(roomId).emit("scoresReset");
          io.to(roomId).emit("waitingForOpponent");
          room.symbols = {};
          room.board = createEmptyBoard();
        } else {
          delete rooms[roomId];
        }
        break;
      }
    }
  });
};

module.exports = tttController;
