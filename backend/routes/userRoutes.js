const express = require("express");
const { registerUser, authUser, logout, usersConnection, getWebSocketConnection, allUser } = require("../controllers/UserController");
const { protect } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUser);

router.route('/users_connection').post(usersConnection);
router.post('/login', authUser);
router.post('/logout', logout);
router.get('/users_connection/:user_id', getWebSocketConnection);

module.exports = router;