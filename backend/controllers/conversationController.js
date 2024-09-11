const Conversation = require('../models/conversationModel'); // Conversation model
const Message = require('../models/messageModel'); // Message model

// Fetch conversation between two users
const getConversationBetweenUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id; // The logged-in user's ID from JWT
    const otherUserId = req.params.otherUserId; // The selected user's ID from the URL

    // Find the conversation between the two users
    const conversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, otherUserId] }  // Both users must be participants
    }).populate('messages'); // Populate messages in the conversation

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json(conversation); // Return conversation with populated messages
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getConversationBetweenUsers };
