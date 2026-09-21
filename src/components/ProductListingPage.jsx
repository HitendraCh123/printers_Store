import { useState } from "react";
import "../assets/css/components_css/ProductListing.css";
import "../assets/css/components_css/FeaturedProducts.css";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import Seo from "./Seo";
import { MdSearchOff, MdWarning } from "react-icons/md";
import { FiLoader } from "react-icons/fi";

const PRICE_RANGES = [
    { label: "Under $50",    min: 0,   max: 50 },
    { label: "$50 – $100",   min: 50,  max: 100 },
    { label: "$100 – $200",  min: 100, max: 200 },
    { label: "$200 – $400",  min: 200, max: 400 },
    { label: "$400+",        min: 400, max: Infinity },
];

export default function ProductListingPage({ title, subtitle, filterCategory, path = "/", metaDescription }) {
    const { products, loading, error } = useProducts();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [sort, setSort] = useState("featured");

    const categoryProducts = !filterCategory
        ? products
        : filterCategory === "printers-only"
        ? products.filter(p => p.category !== "ink")
        : products.filter(p => p.category === filterCategory);

    const availableBrands = [...new Set(categoryProducts.map(p => p.brand))];

    let filtered = [...categoryProducts];
    if (selectedBrands.length > 0)
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    if (selectedPrice)
        filtered = filtered.filter(p => p.price >= selectedPrice.min && p.price < selectedPrice.max);
    if (sort === "price-asc")  filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "rating")     filtered.sort((a, b) => b.rating - a.rating);

    const toggleBrand = (b) =>
        setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);

    return (
        <>
            <Seo
                title={`${title} | printStore`}
                description={metaDescription || subtitle}
                canonicalPath={path}
            />
            {/* Page Hero — full width */}
            <div className="page-hero">
                <div className="container">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </div>

            {/* Listing layout inside container */}
            <div className="listing-layout">
                <div className="container">
                    <div className="listing-layout-inner">

                        {/* Sidebar */}
                        <aside className="filter-sidebar">
                            <div className="filter-card">
                                <h4>Brand</h4>
                                {availableBrands.map(b => (
                                    <div className="filter-option" key={b}>
                                        <input type="checkbox" id={`brand-${b}`}
                                            checked={selectedBrands.includes(b)}
                                            onChange={() => toggleBrand(b)} />
                                        <label htmlFor={`brand-${b}`}>{b}</label>
                                    </div>
                                ))}
                                {selectedBrands.length > 0 && (
                                    <button className="clear-filters" onClick={() => setSelectedBrands([])}>Clear</button>
                                )}
                            </div>

                            <div className="filter-card">
                                <h4>Price Range</h4>
                                {PRICE_RANGES.map(r => (
                                    <div className="filter-option" key={r.label}>
                                        <input type="checkbox" id={`price-${r.label}`}
                                            checked={selectedPrice?.label === r.label}
                                            onChange={() => setSelectedPrice(selectedPrice?.label === r.label ? null : r)} />
                                        <label htmlFor={`price-${r.label}`}>{r.label}</label>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* Main */}
                        <div className="listing-main">
                            <div className="listing-topbar">
                                {loading
                                    ? <p>Loading products...</p>
                                    : <p>Showing <strong>{filtered.length}</strong> products</p>
                                }
                                <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                                    <option value="featured">Sort: Featured</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>

                            {loading && (
                                <div className="plp-state-box">
                                    <FiLoader size={40} className="plp-spin-icon" />
                                    <p className="plp-state-text">Loading products...</p>
                                </div>
                            )}

                            {error && (
                                <div className="plp-state-box plp-state-error">
                                    <MdWarning size={40} />
                                    <p className="plp-state-text">{error}</p>
                                </div>
                            )}

                            {!loading && !error && filtered.length === 0 && (
                                <div className="plp-state-box">
                                    <MdSearchOff size={40} />
                                    <p className="plp-state-text">No products match your filters.</p>
                                    <button className="clear-filters plp-clear-filters-btn"
                                        onClick={() => { setSelectedBrands([]); setSelectedPrice(null); }}>
                                        Clear Filters
                                    </button>
                                </div>
                            )}

                            {!loading && !error && (
                                <div className="row g-4">
                                    {filtered.map(p => (
                                        <div className="col-lg-4 col-md-6" key={p.id}>
                                            <ProductCard product={p} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
