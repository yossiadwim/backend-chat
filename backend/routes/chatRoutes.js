const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/AuthMiddleware");


router.route('/').post(protect, createChat);
router.route('/').get(protect, getAllChat);

module.exports = router;