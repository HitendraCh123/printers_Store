import express from "express";
import Order from "../models/Order.js";
import requireAuth from "../middleware/requireAuth.js";
import { client, paypal } from "../paypalClient.js";

const router = express.Router();

// Every route below requires the user to be logged in (requireAuth runs first)
router.use(requireAuth);

// ── STEP 1: CREATE A PAYPAL ORDER ──  POST /api/orders/create-paypal-order
// This tells PayPal "a customer wants to pay this amount" and gets back
// a PayPal order ID. No money moves yet — this just starts the payment.
router.post("/create-paypal-order", async (req, res) => {
    try {
        const { total } = req.body;

        if (!total || total <= 0) {
            return res.status(400).json({ message: "Invalid order total." });
        }

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: total.toFixed(2),
                    },
                },
            ],
        });

        const paypalOrder = await client.execute(request);

        res.json({ paypalOrderId: paypalOrder.result.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not start payment. Please try again." });
    }
});

// ── STEP 2: CAPTURE + VERIFY PAYMENT, THEN SAVE THE ORDER ──
// POST /api/orders/capture-paypal-order
// This runs AFTER the customer approves payment in the PayPal popup.
// We ask PayPal directly "did this payment really succeed?" — we never
// trust the browser's word for it. Only if PayPal confirms COMPLETED do
// we save the order in our database.
router.post("/capture-paypal-order", async (req, res) => {
    try {
        const { paypalOrderId, items, total } = req.body;

        if (!paypalOrderId || !items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty." });
        }

        const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
        request.requestBody({});

        const capture = await client.execute(request);

        const paymentStatus = capture.result.status; // should be "COMPLETED"

        if (paymentStatus !== "COMPLETED") {
            return res.status(400).json({ message: "Payment was not completed." });
        }

        // Payment is verified by PayPal itself — now it's safe to save the order
        const orderId = "PT-" + Math.floor(10000 + Math.random() * 90000);

        const order = await Order.create({
            orderId,
            user: req.userId,
            items,
            total,
            paymentStatus: "paid",
            paypalOrderId,
        });

        res.status(201).json({ order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Payment verification failed. Please try again." });
    }
});

// ── GET MY ORDERS ──  GET /api/orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId, paymentStatus: "paid" }).sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: "Could not load orders." });
    }
});

export default router;
