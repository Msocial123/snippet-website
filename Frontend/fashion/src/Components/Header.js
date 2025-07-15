
// import React from 'react';
// import './Header.css';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <div className="header-inner">
//         <h1 className="site-title">Snippet</h1>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="heading">
        <h1 className="site-title">Snippet</h1>
      </div>

      <header className="navbar">
        <nav className="navbar-center">
          <ul className="basic-nav-links">
            <li><Link to="/">Home</Link></li>
          </ul>

          <div className="dropdown">
            <p>Browse Categories</p>
            <div className="dropdown-content">
              <Link to="/category/formal">Formal</Link>
              <Link to="/category/casual">Casual</Link>
              <Link to="/category/oversized-tees">Oversized Tees</Link>
              <Link to="/category/tshirts-polos">T-Shirts & Polos</Link>
              <Link to="/category/jackets-outerwear">Jackets & Outerwear</Link>
              <Link to="/category/cargo-pants">Cargo Pants</Link>
              <Link to="/category/hoodies">Hoodies</Link>
            </div>
          </div>

          <div className="dropdown">
            <p>About us</p>
            <div className="dropdown-content">
              <Link to="/home/about-snippet">About Snippet</Link>
              <Link to="/home/our-craft">Our Craft</Link>
              <Link to="/home/press-media">Press & Media</Link>
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
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Link to="/wishlist"><i className="fas fa-heart"></i></Link>

          {/* Profile Dropdown */}
          <div className="profile-dropdown" ref={profileRef}>
            <i
              className="fas fa-user profile-icon"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            ></i>
            {showProfileMenu && (
              <div className="profile-menu">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/logout">Logout</Link>
              </div>
            )}
          </div>

          <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
