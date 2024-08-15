const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors()); //cors 설정

mongoose
  .connect(process.env.DB, {})
  .then(() => console.log("connect to database"));

module.exports = app;
