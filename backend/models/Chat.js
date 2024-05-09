const mongoose = require('mongoose')

const Chat = mongoose.Schema(
    {
        chat_id: mongoose.Schema.Types.ObjectId,
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        
    },
    {timestamps:true}

)