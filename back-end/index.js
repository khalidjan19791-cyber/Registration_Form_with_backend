require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const auth = require("./middleware/auth");
const nodemailer = require("nodemailer");
const path=require("path")

const app = express();
// middleware
app.use(cors());
app.use(express.json());

// sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "www.jan456.com@gmail.com",
    pass: "qeipcczthpmwwmnj",
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const info = await transporter.sendMail({
      from: '"Abasyninan" <www.jan456.com@gmail.com> ',
      to: to,
      subject: subject,
      text: text,
      attachments:[
        {
          filename:'first.pdf',
          path:path.join(__dirname,'files','first.pdf')
        }
      ]
    });
    res.json({ message: "Email Send Successfully!!", info });
  } catch (error) {
    res.status(500).json({ message: "Faild to send email", error });
  }
});

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
