const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");

const createChat = asyncHandler(async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    console.log("user_id param not sent with request");
    res.status(400).json({
      status: "Fail",
    });
  }
  

});

module.exports = { createChat };
