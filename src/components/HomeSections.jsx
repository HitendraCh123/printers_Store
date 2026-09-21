import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/css/components_css/FeaturedProducts.css";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import {
    FaTruck, FaShieldAlt, FaHeadset, FaUndo, FaLaptop, FaTag,
    FaPrint, FaBolt, FaCopy, FaCamera,
} from "react-icons/fa";

/* ─── shared data ─── */
const WHY_ITEMS = [
    { icon: <FaTruck />,     title: "Free, Fast Shipping",  desc: "Free shipping on orders over $49. Most orders ship the same or next day." },
    { icon: <FaShieldAlt />, title: "Genuine Products",     desc: "Every product is 100% genuine and comes from trusted, well-known brands." },
    { icon: <FaHeadset />,   title: "Real People to Help",  desc: "Call 888-428-6413 and talk to a real printer expert, not a bot." },
    { icon: <FaUndo />,      title: "Easy Returns",         desc: "Not happy with it? Send it back within 30 days, no questions asked." },
    { icon: <FaLaptop />,    title: "Setup Support",        desc: "Free help getting your new printer installed, in person or online." },
    { icon: <FaTag />,       title: "Price Match",          desc: "Found it cheaper somewhere else? Show us and we'll match the price." },
];

const CATEGORIES = [
    { icon: <FaPrint />,  title: "Inkjet Printers", desc: "Great for sharp photos and everyday documents, with rich, true-to-life color.", to: "/inkjet-printers" },
    { icon: <FaBolt />,   title: "Laser Printers",  desc: "Quick, reliable, and budget-friendly — a solid pick for any busy office.", to: "/laser-printers" },
    { icon: <FaCopy />,   title: "All-in-One",       desc: "Print, scan, copy, and fax from a single machine — everything in one place.", to: "/all-in-one" },
    { icon: <FaCamera />, title: "Photo Printers",   desc: "Get gallery-quality photo prints at home, with fine detail and true colors.", to: "/photo-printers" },
];

/* ─────────────────────────────────────────────────────────────
   REUSABLE: tilt-rail that wraps ProductCards.
   Structural change from a flat slider: cards sit in a horizontal
   rail with scroll-snap, each card resting at a slight tilt until
   hovered/focused, when it straightens — like flipping through a
   card catalog rather than browsing a flat grid.
───────────────────────────────────────────────────────────── */
function ProductSlider({ products, loading }) {
    const rowRef = useRef(null);

    function slide(dir) {
        rowRef.current?.scrollBy({ left: dir * 270, behavior: "smooth" });
    }

    if (loading) {
        return (
            <div className="state-box">
                <div className="state-box-emoji">⏳</div>
                <p className="state-box-text">Loading products...</p>
            </div>
        );
    }

    if (!products.length) {
        return (
            <div className="state-box state-box-empty">
                No products found.
            </div>
        );
    }

    return (
        <div className="product-slider-outer">
            <button className="slider-arrow left" onClick={() => slide(-1)}>&#8249;</button>

            <div className="product-slider-row tilt-rail" ref={rowRef}>
                {products.map((p) => (
                    <div className="tilt-rail-item" key={p.id}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>

            <button className="slider-arrow right" onClick={() => slide(1)}>&#8250;</button>
        </div>
    );
}

/* Plain section wrapper — scroll-reveal animation removed per design
   update; sections render immediately with no motion. Kept as a
   component so call sites don't need to change. */
function Reveal({ as: Tag = "div", className = "", children }) {
    return <Tag className={className}>{children}</Tag>;
}

/* ─────────────────────────────────────────────────────────────
   1. SHOP BY PRICE
───────────────────────────────────────────────────────────── */

export function ShopByPrice() {
    const { products, loading } = useProducts();
    const [tab, setTab] = useState("under100");

    const PRICE_TABS = [
        { key: "under100", label: "Under $100",     fn: p => p.price < 100 },
        { key: "mid",      label: "$100 – $299.99",  fn: p => p.price >= 100 && p.price < 300 },
        { key: "over300",  label: "$300 and up",     fn: p => p.price >= 300 },
    ];

    const filtered = products.filter(PRICE_TABS.find(t => t.key === tab).fn);

    return (
        <Reveal as="section" className="featured-section">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Shop by Budget</h2>
                        <p className="section-subtitle">Pick a price range and find a printer that fits it</p>
                    </div>
                    <div className="section-tabs">
                        {PRICE_TABS.map(t => (
                            <button
                                key={t.key}
                                className={`section-tab ${tab === t.key ? "active" : ""}`}
                                onClick={() => setTab(t.key)}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
                <ProductSlider products={filtered} loading={loading} />
            </div>
        </Reveal>
    );
}

/* ─────────────────────────────────────────────────────────────
   2. SHOP BY BRAND
───────────────────────────────────────────────────────────── */

export function ShopByBrand() {
    const { products, loading } = useProducts();
    const [tab, setTab] = useState("HP");

    const BRAND_TABS = ["HP", "Canon", "Epson", "Brother"];

    const filtered = products.filter(p =>
        p.brand?.toLowerCase().includes(tab.toLowerCase())
    );
    const display = filtered.length > 0 ? filtered : products;

    return (
        <Reveal as="section" className="featured-section featured-section-alt">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Shop by Brand</h2>
                        <p className="section-subtitle">Already have a favorite brand? Start here</p>
                    </div>
                    <div className="section-tabs">
                        {BRAND_TABS.map(b => (
                            <button
                                key={b}
                                className={`section-tab ${tab === b ? "active" : ""}`}
                                onClick={() => setTab(b)}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                </div>
                <ProductSlider products={display} loading={loading} />
            </div>
        </Reveal>
    );
}

/* ─────────────────────────────────────────────────────────────
   3. FEATURED PRODUCTS
───────────────────────────────────────────────────────────── */
export function FeaturedProducts() {
    const { products, loading } = useProducts();

    return (
        <Reveal as="section" className="featured-section">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Featured Printers</h2>
                        <p className="section-subtitle">Our most popular, best-reviewed printers right now</p>
                    </div>
                    <Link to="/all-printers" className="view-all-link">View All →</Link>
                </div>
                <ProductSlider products={products} loading={loading} />
            </div>
        </Reveal>
    );
}

/* ─────────────────────────────────────────────────────────────
   4. SHOP BY CATEGORY
   Structural change: a stacked horizontal list with large index
   numerals, rather than a card grid. Justified here because these
   really are 4 distinct, browsable categories — the numeral acts
   as a contents-page marker, and the icon panel slides into view
   from the side on hover.
───────────────────────────────────────────────────────────── */
export function ShopByCategory() {
    return (
        <Reveal as="section" className="featured-section">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Shop by Type</h2>
                        <p className="section-subtitle">Not sure what you need? Browse by printer type</p>
                    </div>
                    <div className="section-tabs">
                        <Link to="/all-in-one"      className="section-tab">All-in-One</Link>
                        <Link to="/laser-printers"  className="section-tab">Laser</Link>
                        <Link to="/inkjet-printers" className="section-tab">Inkjet</Link>
                        <Link to="/photo-printers"  className="section-tab">Photo Printers</Link>
                    </div>
                </div>

                <div className="category-stack">
                    {CATEGORIES.map((cat, i) => (
                        <Link to={cat.to} className="category-row" key={i}>
                            <span className="category-row-num">{String(i + 1).padStart(2, "0")}</span>
                            <div className="category-row-icon">{cat.icon}</div>
                            <div className="category-row-text">
                                <h4>{cat.title}</h4>
                                <p>{cat.desc}</p>
                            </div>
                            <span className="category-row-arrow">→</span>
                        </Link>
                    ))}
                </div>
            </div>
        </Reveal>
    );
}

/* ─────────────────────────────────────────────────────────────
   BELOW — supporting sections
───────────────────────────────────────────────────────────── */
export function InkPreview() {
    const { products, loading } = useProducts();
    const inks = products.filter(p => p.category === "ink").slice(0, 4);
    return (
        <Reveal as="section" className="featured-section featured-section-alt">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Ink Cartridges</h2>
                        <p className="section-subtitle">Genuine ink for HP, Canon, Epson, Brother, and more</p>
                    </div>
                    <Link to="/ink-cartridges" className="view-all-link">View All →</Link>
                </div>
                {loading ? (
                    <div className="state-box">⏳ Loading...</div>
                ) : (
                    <div className="row g-4">
                        {inks.map(p => (
                            <div className="col-lg-3 col-md-6" key={p.id}><ProductCard product={p} /></div>
                        ))}
                    </div>
                )}
            </div>
        </Reveal>
    );
}

export function WhyChooseUs() {
    return (
      <Reveal as="section" className="why-section">
            <div className="container">

                <div className="why-heading">
                    <h2>Why Shop With printStore?</h2>
                    <p>
                        We keep it simple: good printers, honest advice, and prices
                        that make sense.
                    </p>
                </div>

                <div className="row g-4">
                    {WHY_ITEMS.map((item, i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                            <div className="why-card">
                                <div className="why-icon">
                                    {item.icon}
                                </div>

                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Reveal>
    );
}

export function BrandsSection() {
    return (
     <Reveal as="section" className="feature-strip">
    <div className="container">
        <div className="feature-grid">
            <div className="feature-card">
                <h4>Free, Fast Delivery</h4>
                <p>On orders over $49</p>
            </div>

            <div className="feature-card">
                <h4>Trusted, Well-Known Brands</h4>
                <p>HP, Canon, Epson, Brother — independent retailer</p>
            </div>

            <div className="feature-card">
                <h4>Real Advice From Real People</h4>
                <p>Chat with a printer specialist any time</p>
            </div>

            <div className="feature-card">
                <h4>Easy 30-Day Returns</h4>
                <p>Change your mind? Send it back, no hassle</p>
            </div>

        </div>
    </div>
</Reveal>
    );
}

export function InfoBanner() {
    return (
        <Reveal className="info-banner">
            <h2>Not Sure Which Printer to Get?</h2>
            <p>Talk to one of our printer experts by phone, or book a visit and we'll come to you.</p>
            <Link to="/book-appointment"><button className="banner-btn">Book an Appointment</button></Link>
        </Reveal>
    );
}
