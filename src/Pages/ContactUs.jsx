import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/components_css/InfoPages.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { submitContactFormApi } from "../api";
import { validateName, validateEmail, validatePhone, validateMessage } from "../utils/validation";
import Seo from "../components/Seo";

export default function ContactUs() {
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(""); // general error (e.g. server failed)

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    // One error message per field, shown right under that field
    const [fieldErrors, setFieldErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear that field's error as soon as the person starts fixing it
        setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }

    function validateForm() {
        const errors = {
            name: validateName(form.name),
            email: validateEmail(form.email),
            phone: validatePhone(form.phone), // optional field
            message: validateMessage(form.message),
        };
        setFieldErrors(errors);
        // Form is valid only if every field's error message is empty
        return Object.values(errors).every(msg => msg === "");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormError("");

        if (!validateForm()) {
            return; // stop here, errors are now shown under each field
        }

        setSubmitting(true);
        try {
            await submitContactFormApi(form);
            setSent(true);
        } catch (err) {
            setFormError(err.message || "Could not send your message. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="info-page">
            <Seo
                title="Contact Us | printStore"
                description="Get in touch with printStore by phone, email, or our online form. We're happy to help with orders, setup, and printer questions."
                canonicalPath="/contact"
            />
            <div className="page-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Got a question? We're happy to help, any time.</p>
                </div>
            </div>
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-card">
                        <h3>Get In Touch</h3>
                        <div className="c-item"><span className="c-icon"><FaPhone /></span><span><strong>Phone</strong><br />888-428-6413<br /><small className="contact-hours-text">Mon–Fri 9am–6pm ET</small></span></div>
                        <div className="c-item"><span className="c-icon"><FaEnvelope /></span><span><strong>Email</strong><br />info@printertrooperinc.com</span></div>
                        <div className="c-item"><span className="c-icon"><FaMapMarkerAlt /></span><span><strong>Address</strong><br />FLAT NO-105, TOWER-D, SDS NRI RESIDENCY,<br />OMEGA-2, GREATER NOIDA, Yamuna Expressway Industrial Development Area , Gautambuddha Nagar, Uttar Pradesh, 201308</span></div>
                        <div className="c-item">
                            <span className="c-icon"><FaCalendarAlt /></span>
                            <span>
                                <strong>In-Person Setup Visits</strong><br />
                                Available around Port Orange &amp; Daytona Beach<br />
                                <Link to="/book-appointment" className="book-appointment-link">Book an appointment →</Link>
                            </span>
                        </div>
                    </div>
                    <div className="contact-card">
                        <h3>Send a Message</h3>
                        {sent ? (
                            <div className="contact-sent-state">
                                <FaCheckCircle size={48} />
                                <p className="contact-sent-text">Message sent! We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                {formError && <div className="auth-error">{formError}</div>}

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number (optional)"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}

                                <select name="subject" value={form.subject} onChange={handleChange}>
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Technical Help</option>
                                    <option>Returns & Refunds</option>
                                </select>

                                <textarea
                                    name="message"
                                    placeholder="How can we help you?"
                                    value={form.message}
                                    onChange={handleChange}
                                />
                                {fieldErrors.message && <div className="field-error">{fieldErrors.message}</div>}

                                <button type="submit" className="submit-btn" disabled={submitting}>
                                    {submitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
