import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper: create a login token for a user
function createToken(user) {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" } // user stays logged in for 30 days
    );
}

// ── SIGN UP ──  POST /api/auth/signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are all required." });
        }

        // Check if this email is already used
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        // Encrypt (hash) the password before saving — never store plain text passwords
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = createToken(user);

        res.status(201).json({
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

// ── LOGIN ──  POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the typed password with the encrypted one stored in the database
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = createToken(user);

        res.json({
            token,
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

export default router;
