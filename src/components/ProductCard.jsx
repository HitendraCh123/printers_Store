import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/components_css/FeaturedProducts.css";
import { useCart } from "../context/CartContext";
import { FaPrint } from "react-icons/fa";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    function handleAdd() {
        addToCart(product);
        setAdded(true);
        setTimeout(() => navigate("/cart"), 600);
    }

    const saving = product.oldPrice ? Math.round(product.oldPrice - product.price) : null;

    return (
        <div className="product-card">
            {/* Badge row — always occupies same height */}
            <div className="product-badge-row">
                {product.badge
                    ? <span className="product-badge">{product.badge}</span>
                    : <span className="product-badge-placeholder" />}
            </div>

            <div className="product-img-wrap">
                {product.icon
                    ? <img src={product.icon} alt={product.name} />
                    : <FaPrint size={56} color="#1B5FAE" />}
            </div>

            {/* Middle content grows to push button down */}
            <div className="product-body">
                <div className="product-name">{product.name}</div>
                <div className="product-meta">{product.brand}</div>

                <div className="product-stars">
                    {"★".repeat(Math.round(product.rating || 0))}
                    <span>({(product.reviews || 0).toLocaleString()})</span>
                </div>

                {/* Price tag — die-cut ticket shape, the recurring retail motif */}
                <div className="price-tag">
                    <span className="price-tag-amount">${product.price?.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="price-tag-old">${product.oldPrice?.toFixed(2)}</span>
                    )}
                </div>

                {saving > 0 && <div className="product-save">You save ${saving}</div>}
            </div>

            <button
                className={`product-add-btn ${added ? "added" : ""}`}
                onClick={handleAdd}
                disabled={added}
            >
                {added ? "✔ Adding..." : "Add to Cart"}
            </button>
        </div>
    );
}
