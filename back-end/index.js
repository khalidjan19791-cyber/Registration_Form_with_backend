const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//connect db
connectDB();

app.use("/api/users", require("./routes/UserRoutes"));

app.listen(5000, () => {
  console.log("server is running  on port 5000");
});
