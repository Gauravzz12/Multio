// server/socket/controllers/tttController.js
const tttController = (io, socket) => {
  const rooms = {}; // { roomId: { board: [...], players: [...], currentPlayer: socketId, symbols: {} } }

  const createEmptyBoard = () => {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  };

  const checkWin = (board, symbol) => {
    // Check rows
    for (let row of board) {
      if (row.every(cell => cell === symbol)) return true;
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === symbol && board[1][col] === symbol && board[2][col] === symbol) return true;
    }

    // Check diagonals
    if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
    if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

    return false;
  };

  const checkDraw = (board) => {
    return board.flat().every(cell => cell !== '');
  };

  socket.on('joinRoom', ({ roomId }) => {
    let assignedRoom = roomId;

    if (!assignedRoom) {
      // Auto-matchmaking for online mode
      for (const [id, room] of Object.entries(rooms)) {
        if (room.mode === 'online' && room.players.length < 2) {
          assignedRoom = id;
          break;
        }
      }
      if (!assignedRoom) {
        // Create new room
        assignedRoom = `room_${Math.random().toString(36).substr(2, 9)}`;
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          currentPlayer: null,
          players: [],
          symbols: {},
          mode: 'online',
        };
      }
      socket.emit('roomAssigned', { roomId: assignedRoom });
    } else {
      // Friends mode with specific room
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          currentPlayer: null,
          players: [],
          symbols: {},
          mode: 'friends',
        };
      }
    }

    socket.join(assignedRoom);
    const room = rooms[assignedRoom];
    room.players.push(socket.id);

    // Assign symbols
    if (room.players.length === 1) {
      room.symbols[socket.id] = 'X';
    } else if (room.players.length === 2) {
      room.symbols[socket.id] = 'O';
      room.currentPlayer = room.players[0];
      // Start the game
      io.to(assignedRoom).emit('startGame', {
        board: room.board,
        currentPlayer: room.currentPlayer,
        symbols: room.symbols,
      });
    } else {
      // Room is full
      socket.emit('roomFull');
    }
  });

  socket.on('makeMove', ({ roomId, x, y }) => {
    const room = rooms[roomId];
    if (!room || room.players.length < 2) return;

    if (socket.id !== room.currentPlayer) return; // Not your turn
    const symbol = room.symbols[socket.id];
    if (room.board[x][y] === '') {
      room.board[x][y] = symbol;

      if (checkWin(room.board, symbol)) {
        io.to(roomId).emit('gameOver', {
          board: room.board,
          winner: socket.id,
          symbol,
        });
        // Reset the room
        room.board = createEmptyBoard();
        room.currentPlayer = null;
        room.symbols = {};
        room.players = [];
        room.mode = room.mode; // Keep the mode
        io.in(roomId).socketsLeave(roomId); // Remove all sockets from the room
        delete rooms[roomId];
      } else if (checkDraw(room.board)) {
        io.to(roomId).emit('gameOver', {
          board: room.board,
          winner: null,
          symbol: null,
        });
        // Reset the board
        room.board = createEmptyBoard();
        io.to(roomId).emit('updateBoard', {
          board: room.board,
          currentPlayer: room.currentPlayer,
        });
      } else {
        // Switch turns
        room.currentPlayer = room.players.find(id => id !== socket.id);
        io.to(roomId).emit('updateBoard', {
          board: room.board,
          currentPlayer: room.currentPlayer,
        });
      }
    }
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of Object.entries(rooms)) {
      const idx = room.players.indexOf(socket.id);
      if (idx !== -1) {
        room.players.splice(idx, 1);
        delete room.symbols[socket.id];
        if (room.players.length === 0) {
          delete rooms[roomId];
        } else {
          io.to(roomId).emit('playerDisconnected');
          // Reset the room
          room.board = createEmptyBoard();
          room.currentPlayer = null;
          room.symbols = {};
          room.players = [];
          delete rooms[roomId];
        }
        break;
      }
    }
  });
};

module.exports = tttController;