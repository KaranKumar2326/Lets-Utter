const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

// Send Message between sender and receiver
const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        console.log(senderId);
        const receiverId = req.params.id;
        const { message } = req.body;

        console.log("Processing sendMessage: ", { senderId, receiverId, message });

        // Check if a conversation already exists
        let getConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId: senderId,
            receiverId: receiverId,
            conversation: getConversation._id,
            message: message
        });

        if (newMessage) {
            getConversation.messages.push(newMessage._id);
            await getConversation.save();

            console.log("Message successfully saved:", newMessage);
            res.status(200).json({
                success: true,
                message: "Message sent successfully",
                data: newMessage
            });
        } else {
            res.status(400).json({ error: "Message creation failed" });
        }
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: "An error occurred while sending the message" });
    }
};

// Get messages for a conversation between sender and receiver
const getMessages = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        let getConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');

        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
            return res.status(200).json({
                success: true,
                messages: []
            });
        }

        res.status(200).json({
            success: true,
            messages: getConversation.messages
        });
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ error: "An error occurred while getting the messages" });
    }
};

module.exports = { sendMessage, getMessages };


