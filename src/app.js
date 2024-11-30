require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const connect = require("../config/db");
const app = express();
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`server is running on ${PORT}`);
  } catch (error) {
    console.log({
      message: "error while running server ",
      error: error.message,
    });
  }
});
