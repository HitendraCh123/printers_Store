import { Link } from "react-router-dom";
import "../assets/css/components_css/Footer.css";
import logo from "../assets/images/logo.png";
import { FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";

export default function Footer() {
    return (


        <footer className="footer-section">
            <div className="container">

                <div className="row g-5">
                    <div className="col-lg-3">
                        <div className="footer-logo-section">
                            <div className="footer-brand">
                                {/* <img src={logo} alt="Logo" className="footer-logo" /> */}
                                <h3>printStore</h3>
                            </div>
                            <div className="disclosure-box">
                                <h4>Independent Retailer Disclosure</h4>
                                <p>printStore is an independent retailer. We are not affiliated with HP, Canon, Epson, or Brother.</p>
                                <span>All product names and brands belong to their respective owners.</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/all-printers">All Printers</Link></li>
                                <li><Link to="/inkjet-printers">Inkjet Printers</Link></li>
                                <li><Link to="/laser-printers">Laser Printers</Link></li>
                                <li><Link to="/all-in-one">All-in-One</Link></li>
                                <li><Link to="/photo-printers">Photo Printers</Link></li>
                                <li><Link to="/ink-cartridges">Ink Cartridges</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="footer-links">
                            <h3>Customer Service</h3>
                            <ul>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/shipping-return-policy">Shipping & Return Policy</Link></li>
                                <li><Link to="/refund-policy">Refund Policy</Link></li>
                                <li><Link to="/terms">Terms & Conditions</Link></li>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link to="/faq">FAQ's</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="footer-contact">
                            <h3>Contact Info</h3>
                            <div className="contact-item"><FaPhoneAlt /><span>012-345-6789</span></div>
                            <div className="contact-item"><FaEnvelope /><span>info@printersupportmy.com</span></div>
                            <div className="contact-item address"><FaBuilding /><span>FLAT NO-105, TOWER-D, <br />SDS NRI RESIDENCY, <br /> OMEGA-2, GREATER NOIDA,Yamuna Expressway Industrial <br />
                             Development Area , Gautambuddha Nagar, Uttar Pradesh, 201308</span></div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 printStore. All rights reserved. | <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
