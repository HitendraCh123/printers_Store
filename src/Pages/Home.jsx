import Hero_section from "../components/Hero_section.jsx";
import {
    ShopByPrice,
    ShopByBrand,
    FeaturedProducts,
    ShopByCategory,
    WhyChooseUs,
    BrandsSection,
    InfoBanner,
    InkPreview,
} from "../components/HomeSections.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import Seo from "../components/Seo.jsx";

const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "printStore",
    description: "Independent online retailer of printers, ink cartridges, and toner for home and business use.",
    url: "https://www.printertrooperinc.com/",
    telephone: "+1-888-428-6413",
    email: "info@printertrooperinc.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "5400 S Williamson Blvd",
        addressLocality: "Port Orange",
        addressRegion: "FL",
        postalCode: "32128",
        addressCountry: "US",
    },
};

export default function Home() {
    return (
        <div>
            <Seo
                title="printStore | Printers, Ink & Toner for Home & Office"
                description="Shop inkjet, laser, all-in-one, and photo printers plus genuine ink cartridges from HP, Canon, Epson, and Brother. Free shipping over $49 and 30-day easy returns."
                canonicalPath="/"
                jsonLd={orgJsonLd}
            />
            <Hero_section />
            <ShopByPrice />
            <ShopByBrand />
            <FeaturedProducts />
            <BrandsSection />
            <ShopByCategory />
            <WhyChooseUs />
            <InfoBanner />
            <InkPreview />
            <FAQAccordion />
        </div>
    );
}
