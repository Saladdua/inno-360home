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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
// app.use("/api/news", newsRouter);          //news 

// Email route
app.post("/send-email", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        console.log("Received email request:", { name, email, phone, subject, message });
        console.log("Environment variables:", {
            EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER ? "Set" : "Not set",
            EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD ? "Set" : "Not set",
            EMAIL_FROM: process.env.EMAIL_FROM ? "Set" : "Not set",
            RECEIVER_EMAIL: process.env.RECEIVER_EMAIL ? "Set" : "Not set"
        });

    console.log("Received email request:", { name, email, phone, subject });

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
        to: process.env.RECEIVER_EMAIL,
        subject: `[360Home] Liên Hệ Tư Vấn: ${subject}`,
        text: `Họ và tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nNội dung:\n${message}`,
    };

    try {
        console.log("Attempting to send email...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send email.",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));