// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../Components/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  // ✅ Define state and function here
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

   const performSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Optional: Clear search after submission
    }
  };

   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

const handleCartClick = (e) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  return (
    <div>
      <div className="heading">
        <h1 className="brand-title">Snippet</h1>
      </div>

      <header className="navbar">
  {/* Home Button */}
  <Link to="/" className="home-button">
    Home
  </Link>

  <nav className="navbar-center">
    <div className="dropdown">
      <p>Browse Categories</p>
      <div className="dropdown-content">
        <Link to="/category/formal">Formal</Link>
        <Link to="/category/casual">Casual</Link>
        <Link to="/category/oversized-tees">Oversized Tees</Link>
        <Link to="/category/polos">Polos</Link>
        <Link to="/category/jackets-outerwear">Jackets & Outerwear</Link>
        <Link to="/category/cargo-pants">Cargo Pants</Link>
        <Link to="/category/hoodies">Hoodies</Link>
      </div>
    </div>

    <div className="dropdown">
      <p>About Us</p>
      <div className="dropdown-content">
        <Link to="/about-us/about-snippet">About Snippet</Link>
        <Link to="/about-us/our-craft">Our Craft</Link>
        <Link to="/about-us/press-media">Press & Media</Link>
      </div>
    </div>

    <div className="dropdown">
      <p>Blog</p>
      <div className="dropdown-content">
        <Link to="/blog/drop-diaries">Drop Diaries</Link>
        <Link to="/blog/style-playbook">Style Playbook</Link>
        <Link to="/blog/Influencer">Influencer Pick</Link>
        <Link to="/blog/whats-trending">What's Trending</Link>
        <Link to="/blog/fitcheck-fridays">Fitcheck Fridays</Link>
        <Link to="/blog/snippet-celebs">Snippet X Celebs</Link>
      </div>
    </div>
  </nav>

  <div className="navbar-right">
    <form onSubmit={handleSearch} className="search-form">
      {/* <i className="fas fa-search"></i> */}
      <input
        type="text"
        placeholder="Search for Products, Brands and More"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button 
              type="submit" 
              className="search-icon-button"
              aria-label="Search"
            >
              <i className="fas fa-search"></i>
            </button>
    </form>
    <Link to="/wishlist"><i className="fas fa-heart"></i></Link>
    <Link to="/login"><i className="fas fa-user"></i></Link>
    <Link to="/cart"  onClick={handleCartClick} className="cart-link">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
  </div>
</header>
<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    </div>
  );
};

export default Navbar;
