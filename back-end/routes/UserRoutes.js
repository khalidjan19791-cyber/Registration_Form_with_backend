const express = require("express");
const User = require("../model/User");

const router = express.Router();

// SignUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // check if user exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User Already Exist!! " });

  const newUser = new User({ name, email, password });
  await newUser.save();
   res.status(201).json({ message: "User created successfully" });
});

// ---------- LOGIN USER ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Check password (plain text for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 4. Success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
