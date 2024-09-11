const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // Your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Listen for Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Socket.IO server running on port 8080');
});
