import { useState } from "react";
import "../assets/css/components_css/InfoPages.css";
import { FaCalendarAlt, FaCheckCircle, FaTools } from "react-icons/fa";
import { bookAppointmentApi } from "../api";
import Seo from "../components/Seo";
import {
    validateName,
    validateEmail,
    validateRequiredPhone,
    validateDate,
    validateTimeSlot,
} from "../utils/validation";

// Fixed list of bookable time slots — keeps things simple, no calendar backend needed
const TIME_SLOTS = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
];

export default function BookAppointment() {
    const [booked, setBooked] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "Printer Repair",
        date: "",
        timeSlot: "",
        notes: "",
    });

    const [fieldErrors, setFieldErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setFieldErrors(prev => ({ ...prev, [name]: "" }));
    }

    function validateForm() {
        const errors = {
            name: validateName(form.name),
            email: validateEmail(form.email),
            phone: validateRequiredPhone(form.phone),
            date: validateDate(form.date),
            timeSlot: validateTimeSlot(form.timeSlot),
        };
        setFieldErrors(errors);
        return Object.values(errors).every(msg => msg === "");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormError("");

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        try {
            await bookAppointmentApi(form);
            setBooked(true);
        } catch (err) {
            setFormError(err.message || "Could not book your appointment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    // Today's date in "YYYY-MM-DD" format, used to stop the date picker from showing past dates
    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div className="info-page">
            <div className="page-hero">
                <div className="container">
                    <Seo
                        title="Book an Appointment | printStore"
                        description="Book an in-person printer repair, setup, or consultation appointment with printStore."
                        canonicalPath="/book-appointment"
                    />
                    <h1><FaTools className="icon-spacing" />Book an Appointment</h1>
                    <p>Pick a time and we'll come to you for a repair, setup, or quick consultation.</p>
                </div>
            </div>

            <div className="container">
                <div className="auth-card appointment-card">
                    {booked ? (
                        <div className="contact-sent-state">
                            <FaCheckCircle size={48} />
                            <p className="contact-sent-text">
                                Appointment booked for {form.date} at {form.timeSlot}! We'll confirm by email shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="auth-icon"><FaCalendarAlt /></div>
                            <h3>Schedule Your Visit</h3>

                            {formError && <div className="auth-error">{formError}</div>}

                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                                    placeholder="Phone Number"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                {fieldErrors.phone && <div className="field-error">{fieldErrors.phone}</div>}

                                <select name="serviceType" value={form.serviceType} onChange={handleChange}>
                                    <option>Printer Repair</option>
                                    <option>Installation</option>
                                    <option>Consultation</option>
                                    <option>Other</option>
                                </select>

                                <input
                                    type="date"
                                    name="date"
                                    min={todayStr}
                                    value={form.date}
                                    onChange={handleChange}
                                />
                                {fieldErrors.date && <div className="field-error">{fieldErrors.date}</div>}

                                <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
                                    <option value="">Select a time slot</option>
                                    {TIME_SLOTS.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                                {fieldErrors.timeSlot && <div className="field-error">{fieldErrors.timeSlot}</div>}

                                <textarea
                                    name="notes"
                                    placeholder="Anything we should know? (optional)"
                                    value={form.notes}
                                    onChange={handleChange}
                                />

                                <button type="submit" className="submit-btn" disabled={submitting}>
                                    {submitting ? "Booking..." : "Book Appointment"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
