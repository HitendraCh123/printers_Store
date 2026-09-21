import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";
export default function RefundPolicy() {
    return (
        <div className="info-page">
            <Seo
                title="Refund Policy | printStore"
                description="Our simple, no-hassle refund policy — how to qualify for a refund, timelines, and what's not eligible."
                canonicalPath="/refund-policy"
            />
            <div className="page-hero"><div className="container"><h1>Refund Policy</h1><p>We stand behind every product we sell</p></div></div>
            <div className="container"><div className="info-content">
                <h2>Our Promise</h2>
                <p>If you're not happy with your purchase, we'll make it right. Our refund process is simple, with no hoops to jump through.</p>
                <h2>Who Qualifies</h2>
                <ul>
                    <li>Return requests must start within 30 days of delivery</li>
                    <li>Products must be in original, unused condition with all packaging</li>
                    <li>Ink cartridges must be unopened and still sealed</li>
                    <li>Items damaged from misuse or normal wear don't qualify</li>
                </ul>
                <h2>How Long It Takes</h2>
                <p>Once we've received and checked your return, we process the refund within 5–7 business days. Depending on your bank, it can take 1–2 billing cycles to show up on your statement.</p>
                <h2>Partial Refunds</h2>
                <p>If an item comes back in different condition than we shipped it, or missing accessories or packaging, we may issue a partial refund instead of a full one.</p>
                <h2>What Can't Be Refunded</h2>
                <ul>
                    <li>Opened ink or toner cartridges</li>
                    <li>Downloadable software or digital products</li>
                    <li>Items marked "Final Sale"</li>
                </ul>
                <h2>How to Request a Refund</h2>
                <p>Email info@printertrooperinc.com or call 888-428-6413 with your order number handy. We'll walk you through it and email a prepaid return label within 24 hours.</p>
            </div>
        </div>
        </div>
    );
}
