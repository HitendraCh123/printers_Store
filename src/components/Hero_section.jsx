import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/components_css/Hero_section.css";

// ─── Slide Data ──────────────────────
// Images sourced from Unsplash (free-to-use license), swapped out from the
// original local banner files per request.
const slides = [
    {
        eyebrow: "01 — Photo Printing",
        title: "Print Your Favorite Photos at Home",
        description: "Turn your favorite pictures into real, physical prints in seconds. Our photo printers give you sharp detail and true-to-life color every time.",
        btnText: "Shop Photo Printers",
        to: "/photo-printers",
        accent: "#EE8C2B",
        icon: "https://images.unsplash.com/photo-1706895040634-62055892cbbb?q=80&w=800&auto=format&fit=crop",
    },
    {
        eyebrow: "02 — Wireless Printing",
        title: "Print From Anywhere, No Wires Needed",
        description: "Send a print job straight from your phone, tablet, or laptop. No cables, no fuss — just easy printing from any room in your home or office.",
        btnText: "See Wireless Printers",
        to: "/all-printers",
        accent: "#1C8A4B",
        icon: "https://images.unsplash.com/photo-1650094980833-7373de26feb6?q=80&w=800&auto=format&fit=crop",
    },
    {
        eyebrow: "03 — Laser Printers",
        title: "Fast, Sharp Prints for Busy Days",
        description: "Need documents printed quickly and clearly? Our laser printers handle big jobs with speed and stay reliable print after print.",
        btnText: "View Laser Printers",
        to: "/laser-printers",
        accent: "#1B5FAE",
        icon: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop",
    },
    {
        eyebrow: "04 — All-in-One",
        title: "One Machine for Everything You Need",
        description: "Print, scan, copy, and fax — all from a single, easy-to-use printer. Great for home offices that want to do more with less space.",
        btnText: "Shop All-in-One",
        to: "/all-in-one",
        accent: "#D6740F",
        icon: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=800&auto=format&fit=crop",
    },
    {
        eyebrow: "05 — Portable",
        title: "Take Your Printer Anywhere You Go",
        description: "Small enough to fit in your bag, strong enough to print when you need it. Perfect for travel, small desks, or printing on the move.",
        btnText: "Shop Portable Printers",
        to: "/inkjet-printers",
        accent: "#134A89",
        icon: "https://images.unsplash.com/photo-1571845995697-28be270350de?q=80&w=800&auto=format&fit=crop",
    },
];

// ─── Component ────────────────────────────────────────────────
// Structural concept: a "desk of printed cards" — instead of one
// full-bleed colored panel, each slide is a card in a tilted stack.
// The active card sits flat and centered; the rest peek out behind
// it at slight rotations, like photos fanned out on a desk.
export default function Hero_section() {
    const [current, setCurrent] = useState(0);

    const goTo = (index) => {
        setCurrent((index + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const slide = slides[current];

    return (
        <div className="hero-wrapper">
            <div className="container">
                <div className="hero-grid">

                    {/* ── Left: copy column ── */}
                    <div className="hero-copy">
                        <span className="hero-eyebrow" style={{ color: slide.accent }}>
                            {slide.eyebrow}
                        </span>
                        <h1 key={slide.title} className="hero-title">{slide.title}</h1>
                        <p key={slide.description} className="hero-desc">{slide.description}</p>
                        <Link to={slide.to}>
                            <button className="hero-btn" style={{ background: slide.accent }}>
                                {slide.btnText}
                            </button>
                        </Link>

                        {/* Punch-tab navigation, styled like ticket stubs */}
                        <div className="hero-tabs">
                            {slides.map((s, i) => (
                                <button
                                    key={i}
                                    className={`hero-tab ${i === current ? "active" : ""}`}
                                    style={i === current ? { borderColor: s.accent, color: s.accent } : undefined}
                                    onClick={() => goTo(i)}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: tilted card stack ── */}
                    <div className="hero-stack">
                        {slides.map((s, i) => {
                            // figure out this card's position relative to current
                            const offset = (i - current + slides.length) % slides.length;
                            if (offset > 2) return null; // only render active + next 2 behind it
                            return (
                                <div
                                    key={i}
                                    className={`hero-stack-card depth-${offset}`}
                                    style={{ "--card-accent": s.accent }}
                                    onClick={() => offset !== 0 && goTo(i)}
                                >
                                    <img src={s.icon} alt={s.title} loading={offset === 0 ? "eager" : "lazy"} />
                                </div>
                            );
                        })}

                        <button className="hero-stack-arrow left" onClick={() => goTo(current - 1)} aria-label="Previous">
                            &#8249;
                        </button>
                        <button className="hero-stack-arrow right" onClick={() => goTo(current + 1)} aria-label="Next">
                            &#8250;
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
