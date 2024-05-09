const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  content: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date,
  },
  seenAt: {
    type: Date,
  },
});

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
