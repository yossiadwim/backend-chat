const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lastUpdatedAt: {
    type: Date,
  },
});

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
