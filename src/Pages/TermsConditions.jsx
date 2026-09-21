import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";
export default function TermsConditions() {
    return (
        <div className="info-page">
            <Seo
                title="Terms & Conditions | printStore"
                description="The terms that govern your use of the printStore website and any orders you place with us."
                canonicalPath="/terms"
            />
            <div className="page-hero"><div className="container"><h1>Terms &amp; Conditions</h1><p>Last updated: January 1, 2025</p></div></div>
            <div className="container"><div className="info-content">
                <h2>1. Agreeing to These Terms</h2>
                <p>By using the printStore website, you're agreeing to these Terms and Conditions. If you don't agree with them, please don't use our site.</p>
                <h2>2. We're an Independent Retailer</h2>
                <p>printStore is an independent retailer. We are not affiliated with, authorized by, sponsored by, or endorsed by HP, Canon, Epson, Brother, or any other printer maker. All product and brand names belong to their respective owners.</p>
                <h2>3. Product Information</h2>
                <p>We try hard to keep product details, pricing, and stock levels accurate. We may correct errors or update product information at any time, without advance notice.</p>
                <h2>4. Orders and Payment</h2>
                <ul>
                    <li>All orders depend on stock availability and our acceptance</li>
                    <li>We may cancel an order at our discretion</li>
                    <li>Payment is required in full before we ship your order</li>
                    <li>All prices are listed in US dollars</li>
                </ul>
                <h2>5. Our Content</h2>
                <p>Everything on this site — text, graphics, logos, and images — belongs to printStore and is protected under copyright and trademark law.</p>
                <h2>6. Limits on Our Liability</h2>
                <p>printStore isn't liable for indirect or incidental damages that come from using our website or the products you buy through it.</p>
                <h2>7. Governing Law</h2>
                <p>These Terms follow the laws of the State of Florida. Any disputes will be handled in the courts of Volusia County, Florida.</p>
                <h2>8. Changes to These Terms</h2>
                <p>We may update these Terms at any time. If you keep using our website after a change, that means you accept the updated Terms.</p>
                <h2>9. Questions?</h2>
                <p>Reach us at info@printertrooperinc.com or 888-428-6413.</p>
            </div>
            </div>
        </div>
    );
}
