import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ── BOOK AN APPOINTMENT ──  POST /api/appointments
// No login required — anyone can book an onsite appointment.
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, serviceType, date, timeSlot, notes } = req.body;

        if (!name || !email || !phone || !serviceType || !date || !timeSlot) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        const appointment = await Appointment.create({
            name, email, phone, serviceType, date, timeSlot, notes,
        });

        res.status(201).json({ appointment });
    } catch (err) {
        res.status(500).json({ message: "Could not book your appointment. Please try again." });
    }
});

export default router;
