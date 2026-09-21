import mongoose from "mongoose";

// This describes what a "user" looks like in the database.
// Mongoose will create a "users" collection automatically.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // no two users can have the same email
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true, // this will be the ENCRYPTED password, never plain text
    },
}, { timestamps: true }); // timestamps adds createdAt / updatedAt automatically

export default mongoose.model("User", userSchema);
