const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database'); // Assuming this is your MongoDB connection file

const userRoute = require('./routes/userRoute'); // User-related routes (register, login)
const messageRoute = require('./routes/messageRoute'); // Message-related routes

const { sendMessage } = require('./controllers/messageController'); // Message controller function

// Load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();

// Setup middleware
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend
  credentials: true,  // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Connect to the database
connectDB();

// Create an HTTP server and bind it with express
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});




// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for the 'sendMessage' event
  socket.on('sendMessage', async (data) => {
    try {
      console.log('Message received from client:', data);

      const { senderId, receiverId, message } = data;

      // Mock request and response to trigger database saving
      const req = { id: senderId, params: { id: receiverId }, body: { message } };
      const res = {
        status: (code) => ({ json: (response) => console.log(`Status: ${code}, Response:`, response) }),
      };

      // Call the controller to save the message to DB
      await sendMessage(req, res);

      // Emit the message to the recipient client
      socket.broadcast.emit('receiveMessage', { senderId, message });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute);

// Set the port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
