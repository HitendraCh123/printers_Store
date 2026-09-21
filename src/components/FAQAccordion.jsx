import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../assets/css/components_css/FeaturedProducts.css";

const FAQS = [
    { q: "What types of printers do you offer?", a: "We carry inkjet printers for sharp photos and everyday documents, laser printers for fast office printing, all-in-one machines that print, scan, copy, and fax, and photo printers for high-quality prints at home. Everything comes from trusted brands like Canon, HP, Epson, and Brother." },
    { q: "Do you offer a warranty on your printers?", a: "Yes! Every printer comes with a 2-year warranty covering manufacturing defects and technical issues. Extended warranty options are available too, if you'd like extra coverage." },
    { q: "What is your shipping policy?", a: "Shipping is free on any order over $49. Orders under $49 ship at our standard rate. Most orders go out within 1–2 business days, and every shipment includes tracking." },
    { q: "Can I return a printer if I'm not happy with it?", a: "Absolutely. You have 30 days from delivery to return any printer for a full refund, as long as it's in its original condition." },
    { q: "Do you provide technical support?", a: "Yes! Our support team is available around the clock by phone, email, and live chat, and can help with setup, troubleshooting, and general maintenance." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are SSL encrypted." },
];

export default function FAQAccordion() {
    const [active, setActive] = useState(null);

    return (
        <section className="faq-home-section">
            <div className="container">
                <div className="section-header faq-section-header">
                    <div>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-subtitle">Got a question? Here are some quick answers.</p>
                    </div>
                    <Link to="/faq" className="view-all-link">View All FAQs →</Link>
                </div>

                <div className="faq-accordion">
                    {FAQS.map((faq, i) => (
                        <div className={`faq-acc-item ${active === i ? "open" : ""}`} key={i}>
                            <div
                                className="faq-acc-question"
                                onClick={() => setActive(active === i ? null : i)}
                            >
                                <span>{faq.q}</span>
                                {active === i
                                    ? <FaChevronUp color="#1B5FAE" size={14} />
                                    : <FaChevronDown color="#aaa" size={14} />}
                            </div>
                            {active === i && (
                                <div className="faq-acc-answer">{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
