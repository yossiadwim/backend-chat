const mongoose = require('mongoose')

const messageModel = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chat_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        },
        content:{
            type: String
        },
        sentAt:{
            type: Date,
            default: Date.now
        },

        deliveredAt: {
            type: Date,
            default: Date.now
        },

        seenAt: {
            type: Date,
            default: Date.now
        }

    }
);

const Message = mongoose.model('Message', messageModel);
module.exports = Message;