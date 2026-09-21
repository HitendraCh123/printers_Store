import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import "../assets/css/components_css/InfoPages.css";
import "../assets/css/components_css/Cart.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { FaShoppingCart, FaTrash, FaTruck, FaLock, FaPrint, FaCheckCircle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import Seo from "../components/Seo";

export default function Cart() {
    const { cart, removeFromCart, updateQty, totalItems, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const { startPaypalOrder, confirmPaypalOrder } = useOrders();
    const navigate = useNavigate();
    const [placedOrder, setPlacedOrder] = useState(null);
    const [checkoutError, setCheckoutError] = useState("");

    const shipping = totalPrice >= 49 ? 0 : 6.99;
    const total = totalPrice + shipping;

    // ── Order confirmation screen ──
    if (placedOrder) {
        return (
            <div className="info-page">
                <div className="page-hero">
                    <div className="container">
                        <h1><FaShoppingCart className="icon-spacing" />Your Cart</h1>
                    </div>
                </div>
                <div className="cart-wrapper">
                    <div className="container">
                        <div className="cart-empty">
                            <div className="cart-empty-icon order-success-icon"><FaCheckCircle /></div>
                            <h3>Payment Successful — Order Placed!</h3>
                            <p>Thanks, {user.name}! Your order <strong>#{placedOrder.orderId}</strong> has been placed.</p>
                            <Link to="/my-orders">
                                <button className="btn-primary">View My Orders</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="info-page">
            <Seo
                title="Your Cart | printStore"
                description="Review your cart and check out securely at printStore."
                canonicalPath="/cart"
            />
            <div className="page-hero">
                <div className="container">
                    <h1><FaShoppingCart className="icon-spacing" />Your Cart</h1>
                    <p>{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
                </div>
            </div>

            <div className="cart-wrapper">
                <div className="container">

                {/* Empty State */}
                {cart.length === 0 && (
                    <div className="cart-empty">
                        <div className="cart-empty-icon"><FaShoppingCart /></div>
                        <h3>Your cart is empty</h3>
                        <p>Take a look around — add a printer or two to get started!</p>
                        <Link to="/all-printers">
                            <button className="btn-primary">Shop Now</button>
                        </Link>
                    </div>
                )}

                {/* Cart with items */}
                {cart.length > 0 && (
                    <div className="cart-layout">

                        {/* Left: Items */}
                        <div className="cart-items">
                            <h3 className="cart-section-title">Cart Items ({totalItems})</h3>

                            {cart.map(item => (
                                <div className="cart-item-card" key={item.id}>
                                    <div className="cart-item-img">
                                        {item.icon
                                            ? <img src={item.icon} alt={item.name} />
                                            : <FaPrint size={32} color="#1B5FAE" />}
                                    </div>
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-brand">{item.brand}</div>
                                        <div className="cart-item-price-unit">${item.price?.toFixed(2)} each</div>
                                        <div className="cart-item-qty">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                <FaTrash className="icon-spacing-sm" />Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item-total">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ))}

                            <Link to="/all-printers" className="continue-shopping">
                                <MdArrowBack className="icon-spacing-sm" />Continue Shopping
                            </Link>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="cart-summary">
                            <h3 className="cart-section-title">Order Summary</h3>
                            {user && (
                                <div className="summary-row checkout-as-row">
                                    <span>Checking out as</span>
                                    <span><strong>{user.name}</strong></span>
                                </div>
                            )}
                            <div className="summary-row">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? "free" : ""}>
                                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <div className="free-shipping-tip">
                                    <FaTruck className="icon-spacing-md" />
                                    Add <strong>${(49 - totalPrice).toFixed(2)}</strong> more for FREE shipping!
                                </div>
                            )}
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            {checkoutError && (
                                <div className="auth-error checkout-error">{checkoutError}</div>
                            )}

                            {/* Not logged in: send to login first, no PayPal button shown */}
                            {!user && (
                                <button
                                    className="checkout-btn"
                                    onClick={() => navigate("/login", { state: { from: "/cart" } })}
                                >
                                    Log In to Check Out →
                                </button>
                            )}

                            {/* Logged in: real PayPal payment button.
                                Order is only saved in our database AFTER PayPal
                                confirms the payment actually succeeded. */}
                            {user && (
                                <div className="paypal-button-wrapper">
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "blue", shape: "rect" }}
                                        createOrder={async () => {
                                            setCheckoutError("");
                                            try {
                                                return await startPaypalOrder({ total });
                                            } catch (err) {
                                                setCheckoutError(err.message || "Could not start payment.");
                                                throw err;
                                            }
                                        }}
                                        onApprove={async (data) => {
                                            try {
                                                const order = await confirmPaypalOrder({
                                                    paypalOrderId: data.orderID,
                                                    items: cart,
                                                    total,
                                                });
                                                setPlacedOrder(order);
                                                clearCart();
                                            } catch (err) {
                                                setCheckoutError(err.message || "Payment verification failed.");
                                            }
                                        }}
                                        onError={() => {
                                            setCheckoutError("Something went wrong with PayPal. Please try again.");
                                        }}
                                        onCancel={() => {
                                            setCheckoutError("Payment was cancelled.");
                                        }}
                                    />
                                </div>
                            )}

                            <div className="secure-badge">
                                <FaLock className="icon-spacing-md" />Secure Checkout · SSL Encrypted
                            </div>
                            <div className="payment-icons">
                                <span>VISA</span><span>MC</span><span>AMEX</span><span>PayPal</span>
                            </div>
                        </div>

                    </div>
                )}
                </div>{/* /container */}
            </div>
        </div>
    );
}
