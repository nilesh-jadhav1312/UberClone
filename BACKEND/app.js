const dotenv = require("dotenv");
dotenv.config();
// dotenv is a library that helps you read environment variables from a .env file
const express = require("express");
const cors = require("cors");
const app = express();
const connectDatabase = require("./db/db"); //from db inside that from db.js
const userRoutes = require("./routes/user.routes");


connectDatabase();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("helo boys");
});

app.use("/users", userRoutes);

module.exports = app;
