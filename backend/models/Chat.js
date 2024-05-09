const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chat_id: mongoose.Schema.Types.ObjectId,
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    },
    {timestamps:true}

)

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;