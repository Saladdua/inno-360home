import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./auth";
// import newsRouter from "./news";          //news   
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
// app.use("/api/news", newsRouter);          //news 

// Email route
app.post("/send-email", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL, // Your email to receive messages
        subject: `[360Home] Liên Hệ Tư Vấn: ${subject}`,
        text: `Họ và tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nNội dung:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));