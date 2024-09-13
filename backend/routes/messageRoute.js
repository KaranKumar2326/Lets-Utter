const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");
// const { isAuthenticated } = require("../middleware/isAuthenticated");


const Message = require('../models/messageModel'); // Assuming the Message model is set up

// API to fetch messages for a specific conversation
router.get('/conversation/:conversationId', async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Fetch all messages for the conversation, sorted by timestamp
    const messages = await Message.find({ conversation: conversationId })
      .sort({ timestamp: 1 }); // Sort messages in ascending order

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
    });
  }
});





router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/receive/:id").get(isAuthenticated,getMessages);

module.exports = router;