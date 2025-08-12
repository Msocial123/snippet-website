




// // import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";
// import { FaHeart } from "react-icons/fa";

// import React, { useState, useContext } from "react";

// import { CartContext } from "../Components/CartContext";
// import CartDrawer from "./CartDrawer";

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const { cartCount } = useContext(CartContext);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };


//   const handleCategoryClick = (route) => {
//     navigate(route);

//    const performSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery(""); // Optional: Clear search after submission
//     }
//   };

//    const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       performSearch();
//     }
//   };

// const handleCartClick = (e) => {
//     e.preventDefault();
//     setIsCartOpen(true);

//   };

//   return (
//     <div>
//       <div className="heading">
//         <h1 className="brand-title">Snippet</h1>
//       </div>

//       <header className="navbar">

//         {/* ✅ Left side: Home + Gender Buttons */}
//         <div className="navbar-left">
//           <Link to="/" className="home-button">Home</Link>
//           <button className="gender-btn" onClick={() => handleCategoryClick("/mencollection")}>Men</button>
//           <button className="gender-btn" onClick={() => handleCategoryClick("/womencollection")}>Women</button>
//         </div>

//   {/* Home Button */}
//   <Link to="/" className="home-button">
//     Home
//   </Link>

//   <nav className="navbar-center">
//     <div className="dropdown">
//       <p>Browse Categories</p>
//       <div className="dropdown-content">
//         <Link to="/category/formal">Formal</Link>
//         <Link to="/category/casual">Casual</Link>
//         <Link to="/category/oversized-tees">Oversized Tees</Link>
//         <Link to="/category/polos">Polos</Link>
//         <Link to="/category/jackets-outerwear">Jackets & Outerwear</Link>
//         <Link to="/category/cargo-pants">Cargo Pants</Link>
//         <Link to="/category/hoodies">Hoodies</Link>
//       </div>
//     </div>


//         {/* ✅ Center dropdown menus */}
//         <nav className="navbar-center">
//           <div className="dropdown">
//             <p>Browse Categories</p>
//             <div className="dropdown-content">
//               <Link to="/category/formal">Formal</Link>
//               <Link to="/category/casual">Casual</Link>
//               <Link to="/category/oversized-tees">Oversized Tees</Link>
//               <Link to="/category/tshirts-polos">T-Shirts & Polos</Link>
//               <Link to="/category/jackets-outerwear">Jackets & Outerwear</Link>
//               <Link to="/category/cargo-pants">Cargo Pants</Link>
//               <Link to="/category/hoodies">Hoodies</Link>
//             </div>
//           </div>


// //           <div className="dropdown">
// //             <p>About Us</p>
// //             <div className="dropdown-content">
// //               <Link to="/about-us/about-snippet">About Snippet</Link>
// //               <Link to="/about-us/our-craft">Our Craft</Link>
// //               <Link to="/about-us/press-media">Press & Media</Link>
// //             </div>
// //           </div>

// //           <div className="dropdown">
// //             <p>Blog</p>
// //             <div className="dropdown-content">
// //               <Link to="/blog/drop-diaries">Drop Diaries</Link>
// //               <Link to="/blog/style-playbook">Style Playbook</Link>
// //               <Link to="/blog/Influencer">Influencer Pick</Link>
// //               <Link to="/blog/whats-trending">What's Trending</Link>
// //               <Link to="/blog/fitcheck-fridays">Fitcheck Fridays</Link>
// //               <Link to="/blog/snippet-celebs">Snippet X Celebs</Link>
// //             </div>
// //           </div>
// //         </nav>

// //         {/* ✅ Right section: Search + Icons */}
// //         <div className="navbar-right">
// //           <form onSubmit={handleSearch} className="search-form">
// //             <i className="fas fa-search"></i>
// //             <input
// //               type="text"
// //               placeholder="Search for Products, Brands and More"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </form>
          

//     <div className="dropdown">
//       <p>Blog</p>
//       <div className="dropdown-content">
//         <Link to="/blog/drop-diaries">Drop Diaries</Link>
//         <Link to="/blog/style-playbook">Style Playbook</Link>
//         <Link to="/blog/Influencer">Influencer Pick</Link>
//         <Link to="/blog/whats-trending">What's Trending</Link>
//         <Link to="/blog/fitcheck-fridays">Fitcheck Fridays</Link>
//         <Link to="/blog/snippet-celebs">Snippet X Celebs</Link>
//       </div>
//     </div>
//   </nav>

//   <div className="navbar-right">
//     <form onSubmit={handleSearch} className="search-form">
//       {/* <i className="fas fa-search"></i> */}
//       <input
//         type="text"
//         placeholder="Search for Products, Brands and More"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyPress={handleKeyPress}
//         className="search-input"
//       />
//       <button
//         type="submit"
//         className="search-icon-button"
//         aria-label="Search"
//       >
//               <i className="fas fa-search"></i>
//             </button>
//     </form>
//     {/* <Link to="/wishlist"><i className="fas fa-heart"></i></Link>
//     <Link to="/login"><i className="fas fa-user"></i></Link> */}
//     <Link to="/cart"  onClick={handleCartClick} className="cart-link">
//             <i className="fas fa-shopping-cart"></i>
//             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//           </Link>
//   </div>
// </header>
// <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />


// <Link to="/wishlist">
//   <FaHeart style={{ color: "red", fontSize: "20px" }} />
// </Link>
//           <Link to="/login"><i className="fas fa-user"></i></Link>
//           <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../Components/CartContext";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleCategoryClick = (route) => {
    navigate(route);
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
        {/* Left side: Home + Gender Buttons */}
        <div className="navbar-left">
          <Link to="/" className="home-button">Home</Link>
          <button className="gender-btn" onClick={() => handleCategoryClick("/mencollection")}>Men</button>
          <button className="gender-btn" onClick={() => handleCategoryClick("/womencollection")}>Women</button>
        </div>

        {/* Center: Dropdown Menus */}
        <nav className="navbar-center">
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

        {/* Right: Search, Wishlist, User, Cart */}
        <div className="navbar-right">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button type="submit" className="search-icon-button" aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <Link to="/wishlist">
            <FaHeart style={{ color: "red", fontSize: "20px", marginLeft: "15px" }} />
          </Link>

          <Link to="/login">
            <i className="fas fa-user" style={{ marginLeft: "15px" }}></i>
          </Link>

          <Link to="/cart" onClick={handleCartClick} className="cart-link">
            <i className="fas fa-shopping-cart" style={{ marginLeft: "15px" }}></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
