require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const connect = require("../config/db");
const signupRote = require("../src/Route/user.signup.route");
const loginRoute = require("../src/Route/user.login.route");
const app = express();
app.use(express.json());
app.use("/signup", signupRote);
app.use("/signin", loginRoute);

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
