import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

// Common Components
import SearchResults from "./Components/SearchResults";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Admin-Components/AdminDashboard";
// Pages & Features
import CartPage from "./Components/CartPage";
import CartDrawer from "./Components/CartDrawer";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import WishlistPage from "./Components/Wishlistpage";
import WomenCollection from "./Components/Womencollection";
import AdminProducts from "./Admin-Components/AdminProducts"; 
import AdminUsers from "./Admin-Components/AdminUsers"; 
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";

// About Us
import AboutSnippet from "./pages/AboutSnippet";
import OurCraft from "./pages/OurCraft";
import Sustainability from "./pages/Sustainability";
import PressMedia from "./pages/PressMedia";

// Blog Pages
import DropDiaries from "./pages/blog/DropDiaries";
import StylePlaybook from "./pages/blog/StylePlaybook";
import InfluencerPick from "./pages/blog/Influencer";
import WhatsTrending from "./pages/blog/WhatsTrending";
import FitcheckFridays from "./pages/blog/FitcheckFridays";
import SnippetXCelebs from "./pages/blog/SnippetXCelebs";

// Optional Landing Page
import LandingPage from "./Components/Landingpage";

//Checkout page
import CheckoutPage from "./Components/CheckoutPage";

import OrderDetailsPage from "./Components/OrderDetailsPage";

import PaymentPage from "./Components/PaymentPage";

// ==============================
// App Content Component
// ==============================
const AppContent = () => {
  const location = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const hideNavbarRoutes = ["/forgot-password", "/reset-password", "/login"];
  const hideFooterRoutes = [
    "/forgot-password",
    "/reset-password",
    "/login",
    "/about-us/about-snippet",
  ];

  return (
    <div
      className={
        hideNavbarRoutes.includes(location.pathname)
          ? "auth-page"
          : "layout-wrapper"
      }
    >
      <ToastContainer position="top-center" autoClose={2000} />

      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="page-content">
        <Routes>
          {/* Admin */}
           <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/admin/users" element={<AdminUsers />} />
          {/* Landing & Home */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mencollection" element={<Home />} />
          <Route path="/womencollection" element={<WomenCollection />} />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Product */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

          {/* About Us */}
          <Route path="/about-us/about-snippet" element={<AboutSnippet />} />
          <Route path="/about-us/our-craft" element={<OurCraft />} />
          <Route path="/about-us/sustainability" element={<Sustainability />} />
          <Route path="/about-us/press-media" element={<PressMedia />} />
<Route path="/admin/products" element={<AdminProducts />} />
          {/* Blog */}
          <Route path="/blog/drop-diaries" element={<DropDiaries />} />
          <Route path="/blog/style-playbook" element={<StylePlaybook />} />
          <Route path="/blog/influencer" element={<InfluencerPick />} />
          <Route path="/blog/whats-trending" element={<WhatsTrending />} />
          <Route path="/blog/fitcheck-fridays" element={<FitcheckFridays />} />
          <Route path="/blog/snippet-celebs" element={<SnippetXCelebs />} />
        
        <Route path="/search" element={<SearchResults />} />

        <Route path="/checkout" element={<CheckoutPage />} />

       <Route path="/order/:orderId" element={<OrderDetailsPage />} />

       <Route path="/payment/:orderId" element={<PaymentPage />} />


        </Routes>
      </div>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

// ==============================
// Main App Wrapper
// ==============================
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
