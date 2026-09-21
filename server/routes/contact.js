import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// ── SUBMIT CONTACT FORM ──  POST /api/contact
// No login required — anyone visiting the site can send a message.
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Please fill in your name, email, subject, and message." });
        }

        const contactMessage = await ContactMessage.create({
            name,
            email,
            phone,
            subject,
            message,
        });

        res.status(201).json({ contactMessage });
    } catch (err) {
        res.status(500).json({ message: "Could not send your message. Please try again." });
    }
});

export default router;
