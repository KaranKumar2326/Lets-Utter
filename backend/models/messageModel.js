// const mongoose = require("mongoose");

// const messageModel = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,

//     },
//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true,
// });

// module.exports = mongoose.model("Message", messageModel);




const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
