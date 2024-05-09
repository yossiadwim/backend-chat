const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  res.send("API Running Succesfully!");
});

app.use("/api/users", userRoutes);
app.user("/api/chats", chatRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
