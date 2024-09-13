const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the server


const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",  // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  }
});

const Message = require('./models/message'); // Assuming the Message model is set up

// Utility function to generate a unique roomId based on two user IDs
const generateRoomId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_'); // Sort the user IDs and join them to ensure consistency
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Event when the client joins a conversation room
  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const roomId = generateRoomId(senderId, receiverId); // Create a unique room for these two users
    socket.join(roomId); // Join the room
    console.log(`User with ID ${senderId} joined room ${roomId}`);
  });

  // Event when a message is sent
  socket.on('sendMessage', async (data) => {
    const { conversationId, senderId, receiverId, message } = data;

    try {
      // Save the message in the database
      const newMessage = new Message({
        senderId,
        receiverId,
        conversation: conversationId,
        message,
      });
      await newMessage.save();

      // Emit the message to the specific room
      const roomId = generateRoomId(senderId, receiverId); // Generate roomId
      io.to(roomId).emit('receiveMessage', {
        senderId,
        receiverId,
        conversationId,
        message,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Event when the client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});







// Start the server on port 8080
server.listen(8080, () => {
  console.log('Socket.IO server running on port 8080');
});
