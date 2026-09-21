import { useState, useEffect } from "react";

// ─── Real products from printertrooperinc.com ───────────────
const REAL_PRODUCTS = [
    // Inkjet
    { id: 1,  name: "Canon PIXMA TS3420",          brand: "Canon",   category: "inkjet",    price: 79.99,  oldPrice: 99.99,  rating: 4.5, reviews: 312, badge: "Best Seller", icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-ts-3720.webp" },
    { id: 7,  name: "HP DeskJet 2855e",             brand: "HP",      category: "inkjet",    price: 70.99,  oldPrice: 89.99,  rating: 4.3, reviews: 245, badge: "Popular",     icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-printer-2855.webp" },
    { id: 11, name: "HP DeskJet 4255e",             brand: "HP",      category: "inkjet",    price: 94.99,  oldPrice: 119.99, rating: 4.4, reviews: 198, badge: null,          icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-4255e.webp" },
    { id: 16, name: "Canon PIXMA TS202 Inkjet Printer", brand: "Canon", category: "inkjet", price: 45.59,  oldPrice: 59.99,  rating: 4.2, reviews: 176, badge: "Sale",        icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-ts202.webp" },
    { id: 14, name: "Canon PIXMA TS7720",           brand: "Canon",   category: "inkjet",    price: 95.99,  oldPrice: 129.99, rating: 4.6, reviews: 289, badge: "Top Rated",   icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-7720.webp" },
    { id: 32, name: "Epson EcoTank ET-2980",        brand: "Epson",   category: "inkjet",    price: 799.99, oldPrice: 899.99, rating: 4.7, reviews: 421, badge: "New",         icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/epson-ecotank-et-2980(32).webp" },
    { id: 30, name: "HP Smart Tank 7602 Wireless",  brand: "HP",      category: "inkjet",    price: 413.99, oldPrice: 479.99, rating: 4.5, reviews: 167, badge: null,          icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-smart-tank-7602.webp" },
    { id: 45, name: "HP Envy 6555e Wireless",       brand: "HP",      category: "inkjet",    price: 155.99, oldPrice: 199.99, rating: 4.4, reviews: 203, badge: "Popular",     icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-envy-6555e(36).webp" },

    // Laser
    { id: 40, name: "HP LaserJet M234sdw",          brand: "HP",      category: "laser",     price: 298.99, oldPrice: 349.99, rating: 4.6, reviews: 334, badge: "Best Seller", icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-laserjet-m234sdw(40).webp" },
    { id: 43, name: "Canon imageCLASS MF451dw",     brand: "Canon",   category: "laser",     price: 358.99, oldPrice: 429.99, rating: 4.5, reviews: 212, badge: "Top Rated",   icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-image-class-mf445dw.webp" },
    { id: 29, name: "Brother HL-L3280CDW",          brand: "Brother", category: "laser",     price: 412.99, oldPrice: 499.99, rating: 4.7, reviews: 389, badge: "New",         icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/brother-hl-l3280cdw.webp" },

    // All-in-One
    { id: 12, name: "Canon PIXMA TR7020a",          brand: "Canon",   category: "all-in-one", price: 94.99, oldPrice: 119.99, rating: 4.4, reviews: 256, badge: "Popular",    icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-7020a.webp" },
    { id: 31, name: "Canon PIXMA TR4720",           brand: "Canon",   category: "all-in-one", price: 88.99, oldPrice: 109.99, rating: 4.3, reviews: 178, badge: null,          icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-tr4720(31).webp" },
    { id: 35, name: "Brother INKvestment MFC-J1215W", brand: "Brother", category: "all-in-one", price: 130.99, oldPrice: 169.99, rating: 4.5, reviews: 298, badge: "Best Seller", icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/brother-inkvestment-mfc-j1215w(35).webp" },

    // Photo
    { id: 33, name: "HP Sprocket Photo Printer",    brand: "HP",      category: "photo",     price: 142.99, oldPrice: 179.99, rating: 4.4, reviews: 321, badge: "Popular",     icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-sprocket-select(33).webp" },
    { id: 34, name: "Canon PIXMA PRO-200S",         brand: "Canon",   category: "photo",     price: 599.99, oldPrice: 699.99, rating: 4.8, reviews: 445, badge: "Top Rated",   icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-pixma-pro-200s(34).webp" },
    { id: 46, name: "Epson WorkForce WF-110",       brand: "Epson",   category: "photo",     price: 249.99, oldPrice: 299.99, rating: 4.5, reviews: 187, badge: "New",         icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/epson-workforce-wf-110(37).webp" },

    // Ink Cartridges
    { id: 20, name: "HP 67 Standard Capacity Ink Cartridge - Black", brand: "HP",      category: "ink", price: 27.59,  oldPrice: 34.99,  rating: 4.5, reviews: 512, badge: "Best Seller", icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-inkcartrages.webp" },
    { id: 19, name: "Canon PG-243 / CL-244 Value Pack",              brand: "Canon",   category: "ink", price: 43.19,  oldPrice: 54.99,  rating: 4.4, reviews: 398, badge: "Popular",     icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-234-cl-244.webp" },
    { id: 39, name: "Brother TN830 Standard-Yield",                  brand: "Brother", category: "ink", price: 68.99,  oldPrice: 84.99,  rating: 4.3, reviews: 267, badge: null,          icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/brother-tn830(39).webp" },
    { id: 41, name: "Canon PG-275XL & CL-276XL 2-Pack",             brand: "Canon",   category: "ink", price: 89.99,  oldPrice: 109.99, rating: 4.6, reviews: 334, badge: "Top Rated",   icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/canon-ink-cartridges-275.webp" },
    { id: 42, name: "HP 61XL High-Yield Ink Cartridge - Black",      brand: "HP",      category: "ink", price: 76.99,  oldPrice: 94.99,  rating: 4.5, reviews: 489, badge: "Sale",        icon: "https://printerproducts.s3.ap-southeast-2.amazonaws.com/hp-ink-cartridges-61xl.webp" },
];

export function useProducts() {
    const [products] = useState(REAL_PRODUCTS);
    const loading = false;
    const error = null;
    return { products, loading, error };
}
