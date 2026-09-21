import mongoose from "mongoose";

// This describes one contact form submission in the database.
const contactMessageSchema = new mongoose.Schema({
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
        type: String, // optional, so no "required"
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // adds createdAt automatically

export default mongoose.model("ContactMessage", contactMessageSchema);
