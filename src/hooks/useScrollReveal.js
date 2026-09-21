import { useEffect, useRef, useState } from "react";

// Adds a "reveal" animation the first time an element scrolls into view.
// Usage: const [ref, revealed] = useScrollReveal();
//        <section ref={ref} className={revealed ? "is-revealed" : ""}>
export function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect users who've asked for less motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setRevealed(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    observer.disconnect(); // only animate in once
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, revealed];
}
