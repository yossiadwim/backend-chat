const express = require("express");
const { createChat } = require("../controllers/ChatController");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route('/').post(protect, createChat);
// router.route('/').get(protect, getAllChat);

module.exports = router;