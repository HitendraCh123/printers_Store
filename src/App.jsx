import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrdersProvider } from "./context/OrdersContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import AllPrinters from "./Pages/AllPrinters";
import InkjetPrinters from "./Pages/InkjetPrinters";
import LaserPrinters from "./Pages/LaserPrinters";
import AllInOne from "./Pages/AllInOne";
import PhotoPrinters from "./Pages/PhotoPrinters";
import InkCartridges from "./Pages/InkCartridges";
import Cart from "./Pages/Cart";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import FAQ from "./Pages/FAQ";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import ShippingReturnPolicy from "./Pages/ShippingReturnPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import TrackOrder from "./Pages/TrackOrder";
import MyOrders from "./Pages/MyOrders";
import SearchResults from "./Pages/SearchResults";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookAppointment from "./Pages/BookAppointment";
import GetStarted from "./Pages/GetStarted";



function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

function App() {
    return (
        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "USD" }}>
            <AuthProvider>
                <OrdersProvider>
                    <CartProvider>
                        <BrowserRouter basename="/printer_trooper/">
                            <ScrollToTop />
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/all-printers" element={<AllPrinters />} />
                                <Route path="/inkjet-printers" element={<InkjetPrinters />} />
                                <Route path="/laser-printers" element={<LaserPrinters />} />
                                <Route path="/all-in-one" element={<AllInOne />} />
                                <Route path="/photo-printers" element={<PhotoPrinters />} />
                                <Route path="/ink-cartridges" element={<InkCartridges />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/terms" element={<TermsConditions />} />
                                <Route path="/shipping-return-policy" element={<ShippingReturnPolicy />} />
                                <Route path="/refund-policy" element={<RefundPolicy />} />
                                <Route path="/track-order" element={<TrackOrder />} />
                                <Route path="/my-orders" element={<MyOrders />} />
                                <Route path="/search" element={<SearchResults />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/book-appointment" element={<BookAppointment />} />
                                <Route path="/get-started" element={<GetStarted />} />
                            </Routes>
                            <Footer />
                        </BrowserRouter>
                    </CartProvider>
                </OrdersProvider>
            </AuthProvider>
        </PayPalScriptProvider>
    );
}

export default App;
