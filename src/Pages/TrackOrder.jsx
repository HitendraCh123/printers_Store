import { useState } from "react";
import "../assets/css/components_css/InfoPages.css";
import { FaSearch, FaTruck, FaBox, FaCheckCircle, FaClock } from "react-icons/fa";
import Seo from "../components/Seo";

export default function TrackOrder() {
    const [orderId, setOrderId] = useState("");
    const [result, setResult] = useState(null);

    function handleTrack() {
        if (!orderId.trim()) return;
        // Demo result
        setResult({
            id: orderId.trim().toUpperCase(),
            status: "In Transit",
            date: "June 18, 2026",
            product: "Canon PIXMA TR4720",
            carrier: "FedEx",
            tracking: "794644792798",
            steps: [
                { label: "Order Placed",    done: true,  icon: <FaBox /> },
                { label: "Processing",      done: true,  icon: <FaClock /> },
                { label: "Shipped",         done: true,  icon: <FaTruck /> },
                { label: "Out for Delivery",done: false, icon: <FaTruck /> },
                { label: "Delivered",       done: false, icon: <FaCheckCircle /> },
            ]
        });
    }

    return (
        <div className="info-page">
            <Seo
                title="Track Your Order | printStore"
                description="Enter your order ID to check the shipping status of your printStore order."
                canonicalPath="/track-order"
            />
            <div className="page-hero">
                <div className="container">
                    <h1>Track Your Order</h1>
                    <p>Enter your order ID to see the latest status of your shipment.</p>
                </div>
            </div>

            <div className="container">
                <div className="track-box">
                    <div className="track-input-row">
                        <input
                            type="text"
                            className="track-input"
                            placeholder="Enter Order ID (e.g. PT-10042)"
                            value={orderId}
                            onChange={e => setOrderId(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleTrack()}
                        />
                        <button className="track-btn" onClick={handleTrack}>
                            <FaSearch className="icon-spacing-lg" />Track Order
                        </button>
                    </div>

                    {result && (
                        <div className="track-result">
                            <div className="track-meta">
                                <div><span>Order ID</span><strong>#{result.id}</strong></div>
                                <div><span>Product</span><strong>{result.product}</strong></div>
                                <div><span>Carrier</span><strong>{result.carrier}</strong></div>
                                <div><span>Tracking #</span><strong>{result.tracking}</strong></div>
                                <div><span>Last Updated</span><strong>{result.date}</strong></div>
                            </div>

                            <div className="track-steps">
                                {result.steps.map((s, i) => (
                                    <div className={`track-step ${s.done ? "done" : ""}`} key={i}>
                                        <div className="step-icon">{s.icon}</div>
                                        <div className="step-label">{s.label}</div>
                                        {i < result.steps.length - 1 && <div className="step-line" />}
                                    </div>
                                ))}
                            </div>

                            <div className="track-status-badge">
                                <FaTruck className="icon-spacing-lg" />{result.status}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
