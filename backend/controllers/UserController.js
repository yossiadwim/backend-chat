const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/User");
const UserConnection = require("../models/UserConnection");
const mongoose = require("mongoose");

//register
const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please Enter all the Fields",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      status: "fail",
      message: "User Already Exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "User Not Created",
    });
  }
};

//login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user && (await user.matchPassword(password))) {
      req.session.userId = user._id;
      return res.json({
        status: "success",
        message: "Login Successful",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Username or password invalid",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.status(200).json({
    status: "success",
    message: "Logout Successful",
  });
});

const usersConnection = asyncHandler(async (req, res) => {
  const { user_id, remote_address, websocket_connection } = req.body;

  const userConnectionExists = await UserConnection.findOne({
    user_id: user_id,
  });

  if (userConnectionExists) {
    await userConnectionExists.updateOne({
      $set: {
        remote_address: remote_address,
        websocket_connection: websocket_connection,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User Connection Updated Successfully",
    });
  }

  const userConnection = await UserConnection.create({
    user_id: user_id,
    remote_address,
    websocket_connection,
  });

  if (userConnection) {
    return res.status(201).json({
      status: "success",
      message: "User Connection Created Successfully",
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "User Connection Not Created",
    });
  }
});

const getWebSocketConnection = asyncHandler(async (req, res) => {
  const user_id = new mongoose.Types.ObjectId(req.params.user_id);
  const userConnection = await UserConnection.findOne({ user_id });
  if (userConnection) {
    return res.status(200).json({
      status: "success",
      data: {
        websocket_connection: userConnection.websocket_connection,
      },
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "User Connection Not Found",
    });
  }
});

const allUser = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "No Users Found",
    });
  }
});

module.exports = {
  registerUser,
  authUser,
  usersConnection,
  getWebSocketConnection,
  logout,
  allUser
};
