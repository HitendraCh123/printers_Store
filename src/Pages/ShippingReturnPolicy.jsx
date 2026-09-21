import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";
export default function ShippingReturnPolicy() {
    return (
        <div className="info-page">
            <Seo
                title="Shipping & Returns | printStore"
                description="Free shipping on orders over $49, plus easy 30-day returns. Here's everything you need to know about shipping and returns at printStore."
                canonicalPath="/shipping-return-policy"
            />
            <div className="page-hero"><div className="container"><h1>Shipping &amp; Returns</h1><p>Free shipping on orders over $49</p></div></div>
            <div className="container"><div className="info-content">
                <h2>Shipping</h2>
                <h2>How Long It Takes</h2>
                <p>Most in-stock orders ship within 1–2 business days (Monday–Friday, excluding holidays). You'll get a shipping confirmation email with tracking as soon as your order is on its way.</p>
                <h2>Shipping Options</h2>
                <ul>
                    <li><strong>Free Standard Shipping</strong> — Orders over $49 (5–7 business days)</li>
                    <li><strong>Standard Shipping</strong> — $6.99 (5–7 business days)</li>
                    <li><strong>Expedited Shipping</strong> — $14.99 (2–3 business days)</li>
                    <li><strong>Overnight Shipping</strong> — $29.99 (next business day)</li>
                </ul>
                <h2>Where We Ship</h2>
                <p>We ship to all 50 US states. At this time, we can't ship to PO Boxes, APO/FPO addresses, or outside the US.</p>
                <h2>Returns</h2>
                <h2>30-Day Returns</h2>
                <p>Not happy with your order? You can return it within 30 days of delivery for a full refund or an exchange — no hassle.</p>
                <h2>What We Need Back</h2>
                <ul>
                    <li>The item in its original, unused condition</li>
                    <li>The original packaging</li>
                    <li>Ink cartridges unopened and sealed</li>
                    <li>Your proof of purchase</li>
                </ul>
                <h2>How to Return Something</h2>
                <p>1. Contact us at info@printertrooperinc.com or 888-428-6413 to start your return.<br />
                2. We'll email you a prepaid return shipping label.<br />
                3. Pack the item securely and drop it at any UPS location.<br />
                4. Your refund goes through within 5–7 business days of us receiving the return.</p>
                <h2>Damaged or Defective Items</h2>
                <p>If your item arrives damaged or not working, contact us within 48 hours with a few photos. We'll send a free replacement or issue a full refund — whichever you'd prefer.</p>
            </div>
        </div>
        </div>
    );
}
