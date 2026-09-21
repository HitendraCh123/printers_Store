import jwt from "jsonwebtoken";

// This function runs BEFORE any "protected" route (like placing an order).
// It checks: did the browser send a valid login token? If yes, let the
// request continue and attach the user's id to it. If no, block it.
export default function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization; // looks like: "Bearer eyJhbGciOi..."

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Please login first." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // now every route after this knows who is making the request
        next(); // continue to the actual route
    } catch (err) {
        return res.status(401).json({ message: "Session expired, please login again." });
    }
}
