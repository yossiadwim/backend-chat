
const mongoose = require("mongoose");

const userConnectionSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  remote_address: { type: String, required: true },
  websocket_connection: { type: Boolean, required: true },
});

const UserConnection = mongoose.model("UserConnection", userConnectionSchema, "user_connections");
module.exports = UserConnection;
