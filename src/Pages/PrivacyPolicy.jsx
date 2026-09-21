import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";
export default function PrivacyPolicy() {
    return (
        <div className="info-page">
            <Seo
                title="Privacy Policy | printStore"
                description="How printStore collects, uses, and protects your personal information."
                canonicalPath="/privacy-policy"
            />

                <div className="page-hero"><div className="container"><h1>Privacy Policy</h1><p>Last updated: January 1, 2025</p></div></div>
                <div className="container"><div className="info-content">
                    <h2>1. Information We Collect</h2>
                    <p>We collect the information you give us directly — things like your name, email, shipping address, phone number, and payment details when you place an order or contact us.</p>
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>To process and ship your orders</li>
                        <li>To send order confirmations and shipping updates</li>
                        <li>To answer your questions and support requests</li>
                        <li>To send occasional promotional emails (you can opt out any time)</li>
                        <li>To make our website and service better</li>
                    </ul>
                    <h2>3. Sharing Your Information</h2>
                    <p>We don't sell, trade, or rent your personal information to anyone. We only share it with the service providers we need to fulfill your order — like shipping carriers and payment processors.</p>
                    <h2>4. Cookies</h2>
                    <p>We use cookies to make browsing smoother, remember what's in your cart, and see how people use our site. You can turn cookies off in your browser, though some features may stop working properly.</p>
                    <h2>5. Keeping Your Data Safe</h2>
                    <p>We use industry-standard security to protect your information. All payments are encrypted and handled by secure, PCI-compliant processors — we never store your full card number.</p>
                    <h2>6. Your Rights</h2>
                    <p>You can ask to see, correct, or delete your personal information any time by contacting us at info@printertrooperinc.com or calling 888-428-6413.</p>
                    <h2>7. Contact Us</h2>
                    <p>For privacy questions, reach us at:<br />printStore<br />FLAT NO-105, TOWER-D, SDS NRI RESIDENCY, OMEGA-2, GREATER NOIDA, Yamuna Expressway Industrial Development Area , Gautambuddha Nagar, Uttar Pradesh, 201308<br />info@printertrooperinc.com</p>
                </div>
            </div>

        </div>
    );
}
