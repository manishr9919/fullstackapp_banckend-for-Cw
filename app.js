require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const connect = require("./config/db");
const signupRote = require("./src/Route/user.signup.route");
const loginRoute = require("./src/Route/user.login.route");
const productRoute = require("./src/Route/product.route");
const cors = require("cors");
const registration = require("./src/model/user.signUp.model");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/signup", signupRote);
app.use("/signin", loginRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await registration.find(); // Correct usage without `new`
    res.status(200).json({ message: "Fetch all users is successful", allUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message }); // Send error response to the client
  }
});



const startServer = async () => {
  try {
    await connect(); // ✅ Connect to DB first
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Error starting server:", error.message);
  }
};

startServer();
