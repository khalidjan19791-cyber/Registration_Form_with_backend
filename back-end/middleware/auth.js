const jwt = require("jsonwebtoken");
const User = require("../model/User");

const auth = async (req, res, next) => {
  try {
    console.log("Headers:", req.headers); // check incoming headers
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = bearerHeader.replace("Bearer", "").trim();
    console.log("Token received:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const currentUser = await User.findById(decoded.userId).select("-password");
    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    req.user = currentUser;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
