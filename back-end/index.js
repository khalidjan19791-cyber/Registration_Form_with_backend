require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const auth = require("./middleware/auth");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// Public routes
app.use("/api/users", require("./routes/UserRoutes"));

// Example protected route
app.get("/api/protected", auth, (req, res) => {
  res.status(200).json({ message: "You are authorized", user: req.user });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
