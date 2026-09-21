// Small, simple validation helpers — reused by Contact Us and Book Appointment forms.
// Each function returns an error message (string) if invalid, or "" if valid.

export function validateName(name) {
    if (!name || name.trim().length < 2) {
        return "Please enter your full name (at least 2 characters).";
    }
    return "";
}

export function validateEmail(email) {
    if (!email) {
        return "Email is required.";
    }
    // Simple, readable email pattern: something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return "Please enter a valid email address.";
    }
    return "";
}

export function validatePhone(phone) {
    // Phone is optional — only validate if the person typed something
    if (!phone) return "";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
        return "Please enter a valid 10-digit phone number.";
    }
    return "";
}

export function validateRequiredPhone(phone) {
    // Same digit check, but phone is required (used for appointments)
    if (!phone) return "Phone number is required.";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
        return "Please enter a valid 10-digit phone number.";
    }
    return "";
}

export function validateMessage(message, minLength = 10) {
    if (!message || message.trim().length < minLength) {
        return `Please enter a message (at least ${minLength} characters).`;
    }
    return "";
}

export function validateDate(date) {
    if (!date) {
        return "Please select a date.";
    }
    // Don't allow picking a date in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(date);
    if (picked < today) {
        return "Please select a date today or in the future.";
    }
    return "";
}

export function validateTimeSlot(timeSlot) {
    if (!timeSlot) {
        return "Please select a time slot.";
    }
    return "";
}
