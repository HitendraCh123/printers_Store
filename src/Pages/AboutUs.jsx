import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";

const stats = [
    { num: "10K+", label: "Happy Customers" },
    { num: "500+", label: "Printer Models" },
    { num: "15+", label: "Years in Business" },
    { num: "4.8★", label: "Average Rating" },
];

export default function AboutUs() {
    return (
        <div className="info-page">
            <Seo
                title="About Us | printStore"
                description="printStore is an independent printer and ink retailer based in Port Orange, Florida, helping customers find the right printer since 2009."
                canonicalPath="/about"
            />

            <div className="about-hero">
                <div className="about-overlay">
                    <div className="container">
                        <div className="about-hero-content">
                            <h1>About printStore</h1>
                            <p>
                                Your independent shop for printers, ink, and toner —
                                run by people who actually know printers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="about-stats">
                    {stats.map((s) => (
                        <div className="stat-card" key={s.label}>
                            <span className="stat-num">{s.num}</span>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="info-content">
                    <h2>Who We Are</h2>
                    <p>
                        printStore is an independent retailer based in Gautambuddha Nagar, Uttar Pradesh. We sell printers, ink cartridges, and printer
                        accessories for both home and business use. We opened our doors
                        in 2009, and since then we've helped thousands of customers find
                        a printer that actually fits what they need.
                    </p>

                    <p>
                        We are not affiliated with, authorized by, or sponsored by any
                        printer maker, including HP, Canon, Epson, or Brother. Every
                        product name, logo, and brand you see on this site belongs to
                        its own owner — we just sell and support the products.
                    </p>

                    <h2>What We're About</h2>
                    <p>
                        Buying a printer shouldn't feel confusing. There's no need to
                        wade through pages of specs and marketing terms just to find
                        something that prints your homework or your invoices. We keep
                        things simple: tell us what you print and how often, and we'll
                        point you to a printer that actually makes sense — whether
                        that's a few pages a month or a few thousand.
                    </p>

                    <h2>What We Offer</h2>
                    <ul>
                        <li>Inkjet, laser, all-in-one, and photo printers from trusted brands</li>
                        <li>Genuine ink cartridges for every major brand</li>
                        <li>Real people to talk to at 888-428-6413</li>
                        <li>Free shipping on orders over $49</li>
                        <li>In-person setup visits around Port Orange and Daytona Beach</li>
                        <li>A simple, 30-day return policy</li>
                    </ul>

                    <h2>Get in Touch</h2>
                    <p>
                        📍FLAT NO-105, TOWER-D, SDS NRI RESIDENCY, OMEGA-2, GREATER NOIDA, Yamuna Expressway Industrial Development Area , Gautambuddha Nagar, Uttar Pradesh, 201308
                        <br />
                        📞 888-428-6413
                        <br />
                        ✉️ info@printertrooperinc.com
                    </p>
                </div>
            </div>
        </div>
    );
}
