

// // export default Header;
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";

// function Header() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const profileRef = useRef(null);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowProfileMenu(false);
//     navigate("/");
//   };

//   const categories = [
//     {
//       name: "Men",
//       img: "/images/ChatGPT Image Jul 14, 2025, 10_29_29 AM.png",
//     },
//     {
//       name: "Women",
//       img: "/images/Screenshot 2025-07-14 101841.png",
//     },
//   ];

//   return (
//     <div>
//       <div className="heading">
//         <h1 className="site-title">Snippet</h1>
//       </div>

//       <header className="navbar">
//         <nav className="navbar-center">
//           <ul className="basic-nav-links">
//             <li><Link to="/">Home</Link></li>

//             {/* Men/Women Buttons with Image */}
//             {categories.map((cat) => (
//               <li key={cat.name} className="category-header-btn">
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="category-header-img"
//                   style={{ width: "60px", height: "auto", borderRadius: "8px" }}
//                 />
//                 {cat.name.toLowerCase() === "women" ? (
//                   <Link className="btn" to="/womencollection">
//                     {cat.name}
//                   </Link>
//                 ) : (
//                   <button
//                     className="btn"
//                     onClick={() => navigate("/mencollection")}
//                   >
//                     {cat.name}
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>

//           {/* Dropdown - Categories */}
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

//           {/* Dropdown - About Us */}
//           <div className="dropdown">
//             <p>About us</p>
//             <div className="dropdown-content">
//               <Link to="/home/about-snippet">About Snippet</Link>
//               <Link to="/home/our-craft">Our Craft</Link>
//               <Link to="/home/press-media">Press & Media</Link>
//               {/* <Link to="/mencollection">Men</Link>
//               <Link to="/womencollection">Women</Link> */}
//             </div>
//           </div>

//           {/* Dropdown - Blog */}
//           <div className="dropdown">
//             <p>Blog</p>
//             <div className="dropdown-content">
//               <Link to="/blog/drop-diaries">Drop Diaries</Link>
//               <Link to="/blog/style-playbook">Style Playbook</Link>
//               <Link to="/blog/Influencer">Influencer Pick</Link>
//               <Link to="/blog/whats-trending">What's Trending</Link>
//               <Link to="/blog/fitcheck-fridays">Fitcheck Fridays</Link>
//               <Link to="/blog/snippet-celebs">Snippet X Celebs</Link>
//             </div>
//           </div>
//         </nav>

//         <div className="navbar-right">
//           {/* 🔍 Search */}
//           <form onSubmit={handleSearch} className="search-form">
//             <i className="fas fa-search"></i>
//             <input
//               type="text"
//               placeholder="Search for Products, Brands and More"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>

//           {/* ❤️ Wishlist */}
//           <Link to="/wishlist"><i className="fas fa-heart"></i></Link>

//           {/* 👤 Profile */}
//           <div className="profile-dropdown" ref={profileRef}>
//             <i
//               className="fas fa-user profile-icon"
//               onClick={() => setShowProfileMenu((prev) => !prev)}
//             ></i>
//             {showProfileMenu && (
//               <div className="profile-menu">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link to="/login" onClick={() => setShowProfileMenu(false)}>Login</Link>
//                     <Link to="/signup" onClick={() => setShowProfileMenu(false)}>Signup</Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/account" onClick={() => setShowProfileMenu(false)}>My Account</Link>
//                     <button onClick={handleLogout} className="logout-btn">Logout</button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* 🛒 Cart */}
//           <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/");
  };

  const categories = [
    { name: "Men", img: "/images/ChatGPT Image Jul 14, 2025, 10_29_29 AM.png" },
    { name: "Women", img: "/images/Screenshot 2025-07-14 101841.png" },
  ];

  return (
    <>
      {/* ✅ Static header container */}
      <div className="header-container">
        <div className="heading">
          <h1 className="site-title">Snippet</h1>
        </div>

        <header className="navbar">
          <nav className="navbar-center">
            <ul className="basic-nav-links">
              <li><Link to="/">Home</Link></li>

              {/* Men/Women Buttons */}
              {categories.map((cat) => (
                <li key={cat.name} className="category-header-btn">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="category-header-img"
                    style={{ width: "60px", height: "auto", borderRadius: "8px" }}
                  />
                  {cat.name.toLowerCase() === "women" ? (
                    <Link className="btn" to="/womencollection">
                      {cat.name}
                    </Link>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => navigate("/mencollection")}
                    >
                      {cat.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Dropdown - Categories */}
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

            {/* Dropdown - About Us */}
            <div className="dropdown">
              <p>About us</p>
              <div className="dropdown-content">
                <Link to="/home/about-snippet">About Snippet</Link>
                <Link to="/home/our-craft">Our Craft</Link>
                <Link to="/home/press-media">Press & Media</Link>
              </div>
            </div>

            {/* Dropdown - Blog */}
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
            {/* 🔍 Search */}
            <form onSubmit={handleSearch} className="search-form">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* ❤️ Wishlist */}
            <Link to="/wishlist"><i className="fas fa-heart"></i></Link>

            {/* 👤 Profile */}
            <div className="profile-dropdown" ref={profileRef}>
              <i
                className="fas fa-user profile-icon"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              ></i>
              {showProfileMenu && (
                <div className="profile-menu">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" onClick={() => setShowProfileMenu(false)}>Login</Link>
                      <Link to="/signup" onClick={() => setShowProfileMenu(false)}>Signup</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/account" onClick={() => setShowProfileMenu(false)}>My Account</Link>
                      <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 🛒 Cart */}
            <Link to="/cart"><i className="fas fa-shopping-cart"></i></Link>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
