// // src/components/Navbar.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

// const Navbar = () => {
//   return (
//     <div>
//       <div className="heading">
//         <h1 className="brand-title">Snippet</h1>
//       </div>

//       <header className="navbar">
//         <nav className="navbar-center">

//         <div className="dropdown">
//             <p>Browse Categories</p>
//             <div className="dropdown-content">
//               <Link to="/Browse Categories/formal">Formals</Link>
//               <Link to="/Browse Categories/tees">Oversized Tees</Link>
//               <Link to="/Browse Categories/tshirts">T-Shirts & Polos</Link>
//               <Link to="/Browse Categories/jackets">Jackets & Outerwear</Link>
//               <Link to="/Browse Categories/accessories">Cargo Pants</Link>
//               <Link to="/Browse Categories/shoes">Hoodies</Link>
//               <Link to="/Browse Categories/joggers">Varsity Jackets</Link>
//             </div>
//           </div>

//           <div className="dropdown">
//             <p>Home</p>
//              <div className="dropdown-content">
//               <Link to="/home/About Snippet">About Snippet</Link>
//               <Link to="/home/Our Craft">Our Craft</Link>
//               <Link to="/home/Sustanability">Sustanability</Link>
//               <Link to="/home/Press & Media">Press & Media</Link>
//             </div>
//           </div>

//           {/* <div className="dropdown">
//             <p>Sales</p>
//             <div className="dropdown-content">
//               <Link to="/sales/Snippet Sales">Snippet Sales</Link>
//               <Link to="/sales/Buy 2 get 2">Buy 2 get 2</Link>
//               <Link to="/sales/End of Season Sale">End of Season Sale</Link>
//               <Link to="/sales/Flash Sale">Flash Sale</Link>
//               <Link to="/sales/Student Discount(with verification)">Student Discount(with verification)</Link>
//               <Link to="/sales/Clearence Sale">Clearence Sale</Link>
//             </div>
//           </div> */}

//           <div className="dropdown">
//             <p>Blog</p>
//              <div className="dropdown-content">
//               <Link to="/blog/Drop Diaries">Drop Diaries</Link>
//               <Link to="/blog/Style Playbook">Style Playbook</Link>
//               <Link to="/blog/Influencer Pick">Influencer Pick</Link>
//               <Link to="/blog/What's Trending">What's Trending</Link>
//               <Link to="/blog/Fitcheck Fridays">Fitcheck Fridays</Link>
//               <Link to="/blog/Snippet X Celebs">Snippet X Celebs</Link>
//             </div>
//           </div>

//           {/* <div className="dropdown">
//             <p>New Arrivals</p>
//              <div className="dropdown-content">
//               <Link to="/new-arrivals/Latest Drop">Latest Drop</Link>
//               <Link to="/new-arrivals/Trending Now">Trending Now</Link>
//               <Link to="/new-arrivals/Street Wear essentials">Street Wear essentials</Link>
//               <Link to="/new-arrivals/Just landed">Just landed</Link>
//               <Link to="/new-arrivals/Summer Collection">Summer Collection</Link>
//             </div>
//           </div> */}
//         </nav>


//         <div className="navbar-right">
//            <form onSubmit={handleSearch} className="search-form">
//             <i className="fas fa-search"></i>
//             <input
//               type="text"
//               placeholder="Search for Products, Brands and More"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>
//           <Link to="/search"><i className="fas fa-search"></i></Link>
//           <Link to="/wishlist"><i className="fas fa-heart"></i></Link>
//           <Link to="/login"><i className="fas fa-user"></i></Link>
//           <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // ✅ Define state and function here
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
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
    <Link to="/login"><i className="fas fa-user"></i></Link>
    <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
  </div>
</header>

    </div>
  );
};

export default Navbar;
