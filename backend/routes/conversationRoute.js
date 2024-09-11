const express = require('express');
const { getConversationBetweenUsers } = require('../controllers/conversationController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

// Fetch conversation between logged-in user and another user
router.get('/conversations/:otherUserId', isAuthenticated, getConversationBetweenUsers);

module.exports = router;
