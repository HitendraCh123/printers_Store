import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/components_css/Header.css";
import logo from "../assets/images/logo3.png";
import { FaTruck, FaFolder, FaShoppingCart, FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    }

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header>

            {/* Top bar */}

            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <a href="/" className="logo-links">
                                <h2 className="logo">printStore</h2>
                            </a>
                        </div>

                        <div className="col-md-6">
                            <div className="advisor-wrapper">
                                <span className="advisor-text">Need help ? Call us:</span>
                                <a href="tel:8884286413" className="phone-number">012-345-6789</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* Middle header */}

            {/* <div className="middle-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-2 col-5">
                            <Link to="/"><img src={logo} alt="logo" className="header-logo" /></Link>
                        </div>
                        <div className="col-md-5 col-12 order-md-2 order-3">
                            <form className="search-box" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search printers, ink cartridges..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                                <button type="submit"><FaSearch /></button>
                            </form>
                        </div>
                        <div className="col-md-4 col-5 order-md-3 order-2">
                            <div className="header-actions">
                                <Link to="/all-printers" className="d-none d-md-block">Shop Now</Link>
                                <Link to="/cart" className="cart-link">
                                    <div className="cart-icon">
                                        <span className="cart-count">{totalItems}</span>
                                        <FaShoppingCart />
                                    </div>
                                    <span className="d-none d-md-inline">Cart</span>
                                </Link>
                                {user ? (
                                    <div className="user-menu d-none d-md-flex">
                                        <Link to="/my-orders" className="user-name-link">
                                            <FaUserCircle /> {user.name.split(" ")[0]}
                                        </Link>
                                        <button className="logout-link" onClick={handleLogout}>Logout</button>
                                    </div>
                                ) : (
                                    <Link to="/login" className="d-none d-md-block">Sign up / Login</Link>
                                )}
                                <button className="hamburger d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
                                    {menuOpen ? <FaTimes /> : <FaBars />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Category navbar */}

            <div className="category-navbar">
                <div className="container">
                    <ul className={`category-menu ${menuOpen ? "open" : ""}`}>
                        <li><Link to="/get-started" onClick={() => setMenuOpen(false)}>Get Setup Help</Link></li>
                        <li><Link to="/all-printers" onClick={() => setMenuOpen(false)}>All Printers</Link></li>
                        <li><Link to="/ink-cartridges" onClick={() => setMenuOpen(false)}>Ink Cartridges</Link></li>
                        <li><Link to="/inkjet-printers" onClick={() => setMenuOpen(false)}>Inkjet Printers</Link></li>
                        <li><Link to="/laser-printers" onClick={() => setMenuOpen(false)}>Laser Printers</Link></li>
                        <li><Link to="/all-in-one" onClick={() => setMenuOpen(false)}>All-in-One</Link></li>
                        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
                    </ul>
                </div>
            </div>

        </header>
    );
}
