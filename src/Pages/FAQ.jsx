import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../assets/css/components_css/InfoPages.css";
import Seo from "../components/Seo";

const FAQS = [
    {
        q: "What kinds of printers do you sell?",
        a: "We carry inkjet printers for sharp photos and everyday documents, laser printers for fast office printing, all-in-one machines that print, scan, copy, and fax, and photo printers for high-quality prints at home. Everything comes from trusted brands like Canon, HP, Epson, and Brother."
    },
    {
        q: "Do your printers come with a warranty?",
        a: "Yes. Every printer we sell comes with a 2-year warranty that covers manufacturing defects and technical problems, including parts, labor, and support. Extended warranty options are also available if you want extra peace of mind."
    },
    {
        q: "How much does shipping cost?",
        a: "Shipping is free on any order over $49. Orders under $49 ship at our standard rate. Need it faster? We also offer expedited shipping. Most orders leave our warehouse within 1–2 business days, and every order includes tracking."
    },
    {
        q: "Can I return a printer if it's not what I expected?",
        a: "Yes — you have 30 days from delivery to return it for a full refund. Just make sure it's in its original condition with all the parts and packaging it came with."
    },
    {
        q: "Can I get help if I'm stuck setting up my printer?",
        a: "Of course. Our support team is available around the clock by phone, email, or live chat, and can walk you through setup, troubleshooting, or basic maintenance. We also have setup guides and troubleshooting articles online."
    },
    {
        q: "What payment methods do you take?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), plus PayPal, Apple Pay, Google Pay, and bank transfers. Every payment is protected with SSL encryption."
    },
    {
        q: "Do you offer discounts for businesses or bulk orders?",
        a: "Yes. We offer special pricing for businesses, schools, and bulk orders. Reach out to our business sales team for a custom quote — we also provide account management and ongoing support for larger organizations."
    },
    {
        q: "Can someone come set up my printer in person?",
        a: "Yes, if you're in the Port Orange or Daytona Beach area of Florida. Book a visit through our Contact Us page and one of our technicians will come to you."
    },
    {
        q: "My printer says it's out of ink, but I just replaced the cartridge. What now?",
        a: "This usually means the cartridge isn't seated properly, or the printer needs to recognize it with a quick reset. Try removing and reinserting the cartridge firmly, then restart the printer. If that doesn't work, give our support team a call."
    },
];

export default function FAQ() {
    const [active, setActive] = useState(null);

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <div className="info-page">
            <Seo
                title="Frequently Asked Questions | printStore"
                description="Answers to common questions about shipping, returns, warranties, and support at printStore."
                canonicalPath="/faq"
                jsonLd={faqJsonLd}
            />
            <div className="page-hero">
                <div className="container">
                    <h1>Frequently Asked Questions</h1>
                    <p>Quick answers to the questions we hear most.</p>
                </div>
            </div>

            <div className="container">
                <div className="faq-list">
                    {FAQS.map((faq, i) => (
                        <div className="faq-item" key={i}>
                            <div
                                className="faq-question"
                                onClick={() => setActive(active === i ? null : i)}
                            >
                                <span>{faq.q}</span>
                                {active === i ? <FaChevronUp color="#1B5FAE" /> : <FaChevronDown color="#888" />}
                            </div>
                            {active === i && (
                                <div className="faq-answer">{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
