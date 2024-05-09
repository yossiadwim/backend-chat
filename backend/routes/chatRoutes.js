const express = require("express");
const {
  createChat,
  getAllChatById,
  sendMessage,
  getAllMessageById
} = require("../controllers/ChatController");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route("/").post(protect, createChat);
router.route("/:sender_id?").get(protect, getAllChatById);
router.route("/message").post(protect, sendMessage);
router.route("/message/:chat_id?").get(protect, getAllMessageById);

module.exports = router;
