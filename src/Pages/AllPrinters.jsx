import ProductListingPage from "../components/ProductListingPage";

export default function AllPrinters() {
    return (
        <ProductListingPage
            title="All Printers"
            subtitle="Browse every printer we carry, from budget-friendly picks to high-speed office machines."
            metaDescription="Shop our full range of inkjet, laser, all-in-one, and photo printers from HP, Canon, Epson, and Brother, with free shipping over $49."
            path="/all-printers"
            filterCategory="printers-only"
        />
    );
}
