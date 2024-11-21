// server/socket/controllers/tttController.js
const tttController = (io, socket) => {
    const rooms = {}; // { roomId: { board: [...], players: [...], currentPlayer: socketId } }
  
    const createEmptyBoard = () => {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    };
  
    const checkWin = (board, symbol) => {
      // Check rows, columns, and diagonals for a win
      const winConditions = [
        // Rows
        [ [0,0], [0,1], [0,2] ],
        [ [1,0], [1,1], [1,2] ],
        [ [2,0], [2,1], [2,2] ],
        // Columns
        [ [0,0], [1,0], [2,0] ],
        [ [0,1], [1,1], [2,1] ],
        [ [0,2], [1,2], [2,2] ],
        // Diagonals
        [ [0,0], [1,1], [2,2] ],
        [ [0,2], [1,1], [2,0] ],
      ];
  
      return winConditions.some(condition => {
        return condition.every(([x, y]) => board[x][y] === symbol);
      });
    };
  
    const checkDraw = (board) => {
      return board.every(row => row.every(cell => cell !== ''));
    };
  
    socket.on('joinTTTRoom', ({ roomId }) => {
      // Join or create a room
      let assignedRoom = roomId ? roomId : `room_${Math.random().toString(36).substr(2, 9)}`;
  
      if (!rooms[assignedRoom]) {
        rooms[assignedRoom] = {
          board: createEmptyBoard(),
          players: [],
          currentPlayer: null,
          symbols: {}, // { socketId: 'X' or 'O' }
        };
      }
  
      const room = rooms[assignedRoom];
  
      if (room.players.length >= 2) {
        socket.emit('roomFull');
        return;
      }
  
      socket.join(assignedRoom);
      room.players.push(socket.id);
  
      // Assign symbols (will be updated when both players are connected)
      room.symbols[socket.id] = '';
  
      if (room.players.length === 2) {
        // Randomly select the first player
        const randomIndex = Math.floor(Math.random() * 2);
        room.currentPlayer = room.players[randomIndex];
  
        // Assign symbols based on who goes first
        room.symbols[room.currentPlayer] = 'X';
        const otherPlayer = room.players.find((id) => id !== room.currentPlayer);
        room.symbols[otherPlayer] = 'O';
  
        io.to(assignedRoom).emit('startGame', {
          board: room.board,
          currentPlayer: room.currentPlayer,
          symbols: room.symbols,
        });
      } else {
        socket.emit('waitingForOpponent');
      }
    });
  
    socket.on('tttMove', ({ roomId, x, y }) => {
      const room = rooms[roomId];
      if (!room) return;
  
      const { board, currentPlayer, symbols } = room;
  
      // Validate player and turn
      if (socket.id !== currentPlayer) {
        socket.emit('notYourTurn');
        return;
      }
  
      // Validate move
      if (board[x][y] !== '') {
        socket.emit('invalidMove');
        return;
      }
  
      // Update board
      board[x][y] = symbols[socket.id];
  
      // Check for win or draw
      if (checkWin(board, symbols[socket.id])) {
        io.to(roomId).emit('gameOver', {
          board,
          winner: socket.id,
          symbols,
        });
        delete rooms[roomId]; // Reset room after game over
      } else if (checkDraw(board)) {
        io.to(roomId).emit('gameOver', {
          board,
          winner: null,
          symbols,
        });
        delete rooms[roomId]; // Reset room after draw
      } else {
        // Switch turn
        room.currentPlayer = room.players.find((id) => id !== socket.id);
        io.to(roomId).emit('updateBoard', {
          board,
          currentPlayer: room.currentPlayer,
          symbols,
        });
      }
    });
  
    socket.on('playAgain', ({ roomId }) => {
      const room = rooms[roomId];
      if (!room) return;
  
      if (!room.rematchVotes) {
        room.rematchVotes = [];
      }
      if (!room.rematchVotes.includes(socket.id)) {
        room.rematchVotes.push(socket.id);
      }
  
      if (room.rematchVotes.length === 2) {
        // Reset game state
        room.board = createEmptyBoard();
        delete room.rematchVotes;
  
        // Randomly determine who goes first
        const randomIndex = Math.floor(Math.random() * 2);
        room.currentPlayer = room.players[randomIndex];
  
        // Reassign symbols
        room.symbols[room.currentPlayer] = 'X';
        const otherPlayer = room.players.find(id => id !== room.currentPlayer);
        room.symbols[otherPlayer] = 'O';
  
        io.to(roomId).emit('startGame', {
          board: room.board,
          currentPlayer: room.currentPlayer,
          symbols: room.symbols,
        });
      } else {
        socket.emit('waitingForRematch');
      }
    });
  
    socket.on('disconnect', () => {
      // Handle disconnection
      for (const roomId in rooms) {
        const room = rooms[roomId];
        if (room.players.includes(socket.id)) {
          socket.leave(roomId);
          room.players = room.players.filter((id) => id !== socket.id);
  
          if (room.players.length === 0) {
            delete rooms[roomId];
          } else {
            io.to(roomId).emit('opponentDisconnected');
            delete rooms[roomId];
          }
          break;
        }
      }
    });
  };
  
  module.exports = tttController;