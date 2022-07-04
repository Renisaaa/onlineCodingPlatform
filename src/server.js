const express = require('express')
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const { Socket } = require('socket.io-client');
const ACTIONS = require('./Actions');


const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
function getAllConnectedClients(roomId){
   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
     return {
        socketId,
        username: userSocketMap[socketId],
     }
   });
}

io.on('connection', (Socket) => {
    console.log('socket connected', Socket.id);

      Socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
       userSocketMap[Socket.id] = username;
       Socket.join(roomId);
       const clients = getAllConnectedClients(roomId);
      });


});





const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
