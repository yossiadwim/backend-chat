const mongoose = require("mongoose");

const userChatSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  chat_id: [{
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
  }]
});

const UserChat = moongose.model("UserChat", userChatSchema, "user_chats");
module.exports = UserChat;