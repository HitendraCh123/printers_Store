import mongoose from "mongoose";

// One item inside an order (a printer, ink cartridge, etc.)
const orderItemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    brand: String,
    price: Number,
    qty: Number,
    icon: String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // links this order to a specific user in the "users" collection
        required: true,
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    paypalOrderId: {
        type: String, // PayPal's own order ID, used to verify payment
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
