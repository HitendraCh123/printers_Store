import { useLocation, Link } from "react-router-dom";
import "../assets/css/components_css/InfoPages.css";
import "../assets/css/components_css/FeaturedProducts.css";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";
import Seo from "../components/Seo";

export default function SearchResults() {
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q") || "";
    const { products } = useProducts();

    const results = query.trim()
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    return (
        <div className="info-page">
            <Seo
                title={`Search Results for "${query}" | printStore`}
                description={`Search results for "${query}" at printStore.`}
                canonicalPath="/search"
            />
            <div className="page-hero">
                <div className="container">
                    <h1><FaSearch className="search-title-icon" />Search Results</h1>
                    <p>{results.length} result{results.length !== 1 ? "s" : ""} for "{query}"</p>
                </div>
            </div>

            <div className="container search-results-container">
                {results.length === 0 ? (
                    <div className="search-empty-state">
                        <FaSearch size={48} color="#ccc" />
                        <h3 className="search-empty-title">No results found for "{query}"</h3>
                        <p className="search-empty-text">Try a different search term or browse our categories.</p>
                        <Link to="/all-printers">
                            <button className="btn-primary search-empty-btn">Browse All Printers</button>
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {results.map(p => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={p.id}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
