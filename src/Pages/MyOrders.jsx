import { Link } from "react-router-dom";
import "../assets/css/components_css/InfoPages.css";
import { FaBoxOpen, FaShoppingCart, FaPrint, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import Seo from "../components/Seo";

export default function MyOrders() {
    const { user } = useAuth();
    const { orders } = useOrders();

    // Not logged in — ask them to login first
    if (!user) {
        return (
            <div className="info-page">
                <Seo
                    title="My Orders | printStore"
                    description="Log in to view your printStore order history."
                    canonicalPath="/my-orders"
                />
                <div className="page-hero">
                    <div className="container">
                        <h1>My Orders</h1>
                        <p>Check and manage all your past orders in one place.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="orders-empty">
                        <FaUserCircle size={64} color="#ccc" />
                        <h3>Please Log In</h3>
                        <p>Log in to your account to see your order history.</p>
                        <Link to="/login" state={{ from: "/my-orders" }}>
                            <button className="btn-primary">Log In</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="info-page">
            <Seo
                title="My Orders | printStore"
                description="View and manage your printStore order history."
                canonicalPath="/my-orders"
            />
            <div className="page-hero">
                <div className="container">
                    <h1>My Orders</h1>
                    <p>Check and manage all your past orders in one place.</p>
                </div>
            </div>

            <div className="container">
                {orders.length === 0 ? (
                    <div className="orders-empty">
                        <FaBoxOpen size={64} color="#ccc" />
                        <h3>No Orders Yet</h3>
                        <p>Looks like you haven't ordered anything yet. Start shopping and your orders will show up here.</p>
                        <Link to="/all-printers">
                            <button className="btn-primary">
                                <FaShoppingCart className="icon-spacing-lg" />Shop Now
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div className="order-card" key={order._id}>
                                <div className="order-card-header">
                                    <div>
                                        <div className="order-card-id">Order #{order.orderId}</div>
                                        <div className="order-card-date">
                                            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric", month: "long", day: "numeric"
                                            })}
                                        </div>
                                    </div>
                                    <div className="order-card-total">${order.total.toFixed(2)}</div>
                                </div>
                                <div className="order-card-items">
                                    {order.items.map((item, i) => (
                                        <div className="order-card-item" key={i}>
                                            <div className="order-card-item-img">
                                                {item.icon
                                                    ? <img src={item.icon} alt={item.name} />
                                                    : <FaPrint size={20} color="#1B5FAE" />}
                                            </div>
                                            <div className="order-card-item-name">{item.name}</div>
                                            <div className="order-card-item-qty">x{item.qty}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
