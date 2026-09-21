import mongoose from "mongoose";

// This describes one appointment booking in the database.
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
        enum: ["Printer Repair", "Installation", "Consultation", "Other"],
    },
    date: {
        type: String, // stored as "YYYY-MM-DD" — simple and easy to read
        required: true,
    },
    timeSlot: {
        type: String, // e.g. "10:00 AM - 11:00 AM"
        required: true,
    },
    notes: {
        type: String, // optional extra details from the customer
    },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
