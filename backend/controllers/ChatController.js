const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");
const mongoose = require("mongoose");

const createChat = asyncHandler(async (req, res) => {
  const { sender_id: req_sender_id, receiver_id: req_receiver_id } = req.body;

  if (!req_sender_id || !req_receiver_id) {
    return res.status(400).json({
      status: "fail",
      message: "Please Enter Sender and Receiver",
    });
  }

  if (req_sender_id === null || req_sender_id === "") {
    return res.status(400).json({
      status: "fail",
      message: "Please Enter Sender",
    });
  }
  if (req_receiver_id === null || req_receiver_id === "") {
    return res.status(400).json({
      status: "fail",
      message: "Please Enter Receiver",
    });
  }

  const sender_id = new mongoose.Types.ObjectId(req_sender_id);
  const receiver_id = new mongoose.Types.ObjectId(req_receiver_id);

  const ifSenderExist = await User.findOne({ _id: sender_id });
  const ifReceiverExist = await User.findOne({ _id: receiver_id });

  if (!ifSenderExist && !ifReceiverExist) {
    return res.status(400).json({
      status: "fail",
      message: "Sender or Receiver Not Found",
    });
  }

  const chatExists = await Chat.findOne({
    sender_id,
    receiver_id,
  });

  if (chatExists) {
    const updateChat = await Chat.updateOne(
      {
        sender_id,
        receiver_id,
      },
      {
        $set: {
          lastUpdatedAt: new Date(),
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Chat Updated Successfully",
      data: updateChat,
    });
  }

  const chat = await Chat.create({
    sender_id,
    receiver_id,
    lastUpdatedAt: new Date(),
  });

  return res.status(201).json({
    status: "success",
    message: "Chat Created Successfully",
    data: chat,
  });
});

const getAllChatById = asyncHandler(async (req, res) => {
  const { sender_id: req_sender_id } = req.params;
  const sender_id = new mongoose.Types.ObjectId(req_sender_id);

  const chats = await Chat.find({ sender_id });
  if (chats) {
    return res.status(200).json({
      status: "success",
      data: chats,
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "Chats Not Found",
    });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { chat_id: req_chat_id, content: req_content } = req.body;

  if (!req_chat_id || !req_content) {
    return res.status(400).json({
      status: "fail",
      message: "Chat ID or Content null",
    });
  }

  const chat_id = new mongoose.Types.ObjectId(req_chat_id);
  const content = req_content;

  const ifChatExist = await Chat.findOne({ _id: chat_id });
  if (!ifChatExist) {
    return res.status(400).json({
      status: "fail",
      message: "Chat Not Found",
    });
  }

  const message = await Message.create({
    chat_id,
    content,
    sentAt: new Date(),
    seenAt: new Date(),
  });

  if (message) {
    return res.status(201).json({
      status: "success",
      message: "Message Sent Successfully",
      data: message,
    });
  }
});

const getAllMessageById = asyncHandler(async (req, res) => {
  const { chat_id: req_chat_id } = req.params;

  if (!req_chat_id) {
    return res.status(400).json({
      status: "fail",
      message: "Chat ID null",
    });
  }
  const chat_id = new mongoose.Types.ObjectId(req_chat_id);
  const getMessageById = await Message.find({ chat_id }).sort({ sentAt: -1 });

  if (getMessageById) {
    return res.status(200).json({
      status: "success",
      data: getMessageById,
    });
  }

  return res.status(400).json({
    status: "fail",
    message: "Message Not Found",
  });
});

module.exports = { createChat, getAllChatById, sendMessage, getAllMessageById };
