
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import "./App.css";

// Common Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Auth & User
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import WishlistPage from "./Components/Wishlistpage";
// Pages
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
import WomenCollection from "./Components/Womencollection";
const AppContent = () => {
  const location = useLocation();
   

  const hideNavbarRoutes = ["/forgot-password", "/reset-password", "/login"];
  const hideFooterRoutes = [
    "/forgot-password",
    "/reset-password",
    "/login",
    "/about-us/about-snippet"
  ];
  // const UID = localStorage.getItem("UID") ; // Replace with actual UID logic
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
          {/* Home & Landing */}
          <Route path="/" element={<LandingPage />} />

  {/* Optional: Keep Home for mencollection or any other URL */}
  <Route path="/home" element={<Home />} />
  <Route path="/mencollection" element={<Home />} />

  <Route path="/landing" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/wishlist" element={<WishlistPage />} />


          {/* Product & Category */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/womencollection" element={<WomenCollection />} />
          {/* About Us */}
          <Route path="/about-us/about-snippet" element={<AboutSnippet />} />
          <Route path="/about-us/our-craft" element={<OurCraft />} />
          <Route path="/about-us/sustainability" element={<Sustainability />} />
          <Route path="/about-us/press-media" element={<PressMedia />} />

          {/* Blog Pages */}
          <Route path="/blog/drop-diaries" element={<DropDiaries />} />
          <Route path="/blog/style-playbook" element={<StylePlaybook />} />
          <Route path="/blog/influencer" element={<InfluencerPick />} />
          <Route path="/blog/whats-trending" element={<WhatsTrending />} />
          <Route path="/blog/fitcheck-fridays" element={<FitcheckFridays />} />
          <Route path="/blog/snippet-celebs" element={<SnippetXCelebs />} />
        </Routes>
      </div>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// Inside App return
