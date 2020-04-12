const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const passportConfig = require("./config/passport");

const app = express();

/* middleware */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "anything" }));
app.use(passport.initialize());
app.use(passport.session());

/* api endpoint */
app.use("/api", require("./routes/post.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));

/* api error pages */
app.use("/api", (req, res) => {
  res.status(404).send({ post: "Not found" });
});

/* react website */
app.use(express.static(path.join(__dirname, "../build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* mongoose */
mongoose.connect("mongodb://localhost:27017/bulletinBoard", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to the database");
});
db.on("error", err => console.log("Error: " + err));

/* init server */
const port = process.env.port || 8000;
const server = app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

module.exports = server;
