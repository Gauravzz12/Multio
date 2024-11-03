const { Server } = require("socket.io");

const startSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  const rooms = { RPS: {}, TTT: {} };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (game) => {
      const gameRooms = rooms[game];
      const roomKeys = Object.keys(gameRooms);
      let currentRoomKey;

      if (roomKeys.length === 0) {
        currentRoomKey = '1';
        gameRooms[currentRoomKey] = [socket.id];
      } else {
        currentRoomKey = roomKeys[roomKeys.length - 1];
        const currentRoom = gameRooms[currentRoomKey];

        if (currentRoom.length < 2) {
          currentRoom.push(socket.id);
        } else {
          currentRoomKey = (parseInt(currentRoomKey) + 1).toString();
          gameRooms[currentRoomKey] = [socket.id];
        }
      }

      socket.join(`${game}-${currentRoomKey}`);
      console.log(`User ${socket.id} joined room ${game}-${currentRoomKey}`);
      console.log("Current rooms:", rooms[game]);
    });

    socket.on("disconnect", () => {
      for (const game in rooms) {
        const gameRooms = rooms[game];
        for (const roomKey in gameRooms) {
          const room = gameRooms[roomKey];
          const playerIndex = room.indexOf(socket.id);

          if (playerIndex !== -1) {
            room.splice(playerIndex, 1);
            console.log(`User ${socket.id} left ${game} room ${roomKey}`);

            if (room.length === 0) {
              delete gameRooms[roomKey];
              console.log(`Room ${game}-${roomKey} is now empty and removed.`);
            }
            break; 
          }
        }
      }
    });

    socket.on("choice", (choice) => {
      console.log(`User ${socket.id} selected:`, choice);
    });
  });
};

module.exports = startSocketServer;
