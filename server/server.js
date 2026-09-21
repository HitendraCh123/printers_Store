import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import contactRoutes from "./routes/contact.js";
import appointmentRoutes from "./routes/appointments.js";

dotenv.config(); // loads the .env file

const app = express();

app.use(cors());          // allows your React app (different port/domain) to call this server
app.use(express.json());  // lets the server read JSON sent from the frontend

// ── Routes ──
app.use("/api/auth", authRoutes);     // /api/auth/signup, /api/auth/login
app.use("/api/orders", orderRoutes);  // /api/orders
app.use("/api/contact", contactRoutes); // /api/contact
app.use("/api/appointments", appointmentRoutes); // /api/appointments

// Simple route to check the server is alive
app.get("/", (req, res) => {
    res.send("Printer Shop backend is running!");
});

// ── Connect to MongoDB, then start the server ──
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB:", err.message);
    });
