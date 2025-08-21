


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Landingpage.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import BannerSlider from '../Components/BannerSlider';
// import ProductCard from "./ProductCard";

// // import { Link } from 'react-router-dom';

// const CATEGORY_MAP = {
//   'tshirts-polos': 'T-Shirts & Polos',
//   'oversized-tees': 'Oversized Tees',
//   'jackets-outerwear': 'Jackets & Outerwear',
//   'cargo-pants': 'Cargo Pants',
//   'formal': 'Formal',
//   'casual': 'Casual',
//   'tops': 'Tops',
//   'hoodies': 'Hoodies',
// };

// const FILTERS = ['All', ...Object.values(CATEGORY_MAP)];
//  // initially show 8 products

// const LandingPage = () => {
//   const [products, setProducts] = useState([]);
//   // const [reviews, setReviews] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const { categoryName } = useParams();
//   const navigate = useNavigate();
  

//   // Fetch products based on URL category
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const url = categoryName
//           ? `http://localhost:5000/api/products/category/${categoryName}`
//           : `http://localhost:5000/api/products/landing`;
//         const res = await axios.get(url);
//         setProducts(res.data);
//       } catch (err) {
//         console.error('Product fetch error:', err);
//       }
//     };

//     fetchProducts();
//   }, [categoryName]);

// //   // Fetch reviews
// //   useEffect(() => {
// //   axios.get("http://localhost:5000/api/products/reviews")
// //     .then(res => {
// //       setReviews(res.data);
// //     })
// //     .catch(err => {
// //       console.error("Reviews fetch error:", err);
// //     });
// // }, []);


//   // Determine active filter label
//   useEffect(() => {
//     if (categoryName && CATEGORY_MAP[categoryName]) {
//       setActiveFilter(CATEGORY_MAP[categoryName]);
//     } else {
//       setActiveFilter('All');
//     }
//   }, [categoryName]);

 

//   const features = [
//     { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
//     { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
//     { icon: "🔀", title: "Easy Returns", desc: "7-day hassle-free returns" },
//   ];

//   return (

    
//     <div className="landing-root">

//        <div><BannerSlider /></div>
//       {/* Hero Section */}
//       {/* <section className="hero-banner">
//         <img src="/photo1.png" alt="Hero" className="hero-img" />
//         <div className="hero-content">
//           <h1>Design For Beauty</h1>
//           <p>Summer Collection 2025</p>
//         </div>
//       </section> */}
// {/* 
//       Category Navigation */}

// {/* <section className="categories">
//   <div className="category-list">
//     {categories.map((cat) => (
//       <div key={cat.name} className="category-card">
//         <img src={cat.img} alt={cat.name} />
//         {cat.name.toLowerCase() === "women" ? (
//           <Link className="btn" to="/womencollection">
//             {cat.name}
//           </Link>
//         ) : (
//           <button
//             className="btn"
//             onClick={() => {
//               if (cat.name.toLowerCase() === "men") navigate("/mencollection");
//               else navigate(`/category/${cat.name.toLowerCase()}`);
//             }}
//           >
//             {cat.name}
//           </button>
//         )}
//       </div>
//     ))}
//   </div>
// </section> */}

//       {/* Product Filter Buttons */}
//       <section className="products-section">
//         <h2 className="section-title">Best Selling Product</h2>

//         <div className="product-filters">
//           {FILTERS.map((filter) => {
//             const slug = Object.entries(CATEGORY_MAP).find(
//               ([, label]) => label === filter
//             )?.[0];
//             return (
//               <button
//                 key={filter}
//                 className={`btn${activeFilter === filter ? ' active' : ''}`}
//                 onClick={() => {
//                   if (filter === 'All') navigate('/');
//                   else navigate(`/category/${slug}`);
//                 }}
//               >
//                 {filter}
//               </button>
//             );
//           })}
//         </div>
//         {/* <div><BannerSlider /></div> */}
//         {/* Product Grid */}
//       <div className="product-grid">
//   {products.slice(0, visibleCount).map((product) => (
//     <ProductCard key={product.PID} product={product} />
//   ))}
// </div>

//         {visibleCount < products.length && (
//   <button
//     className="load-more-btn"
//     onClick={() => setVisibleCount((prev) => prev + 8)} // load 8 more
//   >
//     Load More
//   </button>
// )}

//       </section>

//       <section className="hero-banner">
//        <img src="photo1.png" alt="Hero" className="hero-img" />
//        <div className="hero-content">
//          <h1>Design For Beauty</h1>
//          <p>Summer Collection 2025</p>
//        </div>
//      </section>

//       {/* Features */}
//       <section className="features">
//         <div className="features-list">
//           {features.map((f) => (
//             <div key={f.title} className="feature-card">
//               <span className="feature-icon">{f.icon}</span>
//               <h4>{f.title}</h4>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Promo Section */}
//       <section className="promo-section">
//         <div className="promo-card">
//           <img src="/images/Screenshot 2025-07-14 101841.png" alt="Promo" className="promo-img" />
//           <div>
//             <h3>Limited Time Offer</h3>
//             <p>Get exclusive deals on our summer collection. Shop now and enjoy premium quality at the best prices!</p>
//           </div>
//         </div>
//       </section>

//       {/* Reviews */}
//       {/* <section className="reviews">
//         <h2 className="section-title">Customer Reviews</h2>
//         <div className="reviews-list">
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((r, i) => (
//               <div key={i} className="review-card">
//                 <strong>{r.name}</strong>
//                 <p>{r.review}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section> */}

      
//     </div>
//   );
// };

// export default LandingPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Landingpage.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import BannerSlider from "../Components/BannerSlider";
import ProductCard from "./ProductCard";

/* -------------------------------
   Constants
---------------------------------*/
const CATEGORY_MAP = {
  "tshirts-polos": "T-Shirts & Polos",
  "oversized-tees": "Oversized Tees",
  "jackets-outerwear": "Jackets & Outerwear",
  "cargo-pants": "Cargo Pants",
  formal: "Formal",
  casual: "Casual",
  tops: "Tops",
  hoodies: "Hoodies",
};

const FILTERS = ["All", ...Object.values(CATEGORY_MAP)];

const CATEGORIES = [
  { name: "Men", img: "/images/formalshirt2.jpg" },
  { name: "Women", img: "/images/ethnic1.png" },
  { name: "Hoodies", img: "/images/hoodie1.png" },
  { name: "Jackets", img: "/images/jacket2.jpg" },
];

const FEATURES = [
  { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
  { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
  { icon: "🔀", title: "Easy Returns", desc: "7-day hassle-free returns" },
];

const REVIEWS = [
  { name: "Aarav", review: "Amazing quality and fast delivery!" },
  { name: "Riya", review: "Loved the oversized tees 😍" },
  { name: "Karan", review: "Hassle-free returns. Great service!" },
];

/* -------------------------------
   Component
---------------------------------*/
const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeFilter, setActiveFilter] = useState("All");
  const [signupMsg, setSignupMsg] = useState("");

  const { categoryName } = useParams();
  const navigate = useNavigate();

  /* -------------------------------
     Fetch Products
  ---------------------------------*/
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = categoryName
          ? `http://localhost:5000/api/products/category/${categoryName}`
          : `http://localhost:5000/api/products/landing`;

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  /* -------------------------------
     Handle Active Filter
  ---------------------------------*/
  useEffect(() => {
    if (categoryName && CATEGORY_MAP[categoryName]) {
      setActiveFilter(CATEGORY_MAP[categoryName]);
    } else {
      setActiveFilter("All");
    }
  }, [categoryName]);

  /* -------------------------------
     Signup Message Popup
  ---------------------------------*/
  useEffect(() => {
    const msg = localStorage.getItem("signupMessage");
    if (msg) {
      setSignupMsg(msg);
      localStorage.removeItem("signupMessage");
      setTimeout(() => setSignupMsg(""), 4000);
    }
  }, []);

  /* -------------------------------
     Render
  ---------------------------------*/
  return (
    <div className="landing-root">
      {/* Signup Popup */}
      {signupMsg && <div className="popup-message success">{signupMsg}</div>}

      {/* Banner Slider */}
      <BannerSlider />

      {/* Hero Section */}
      <section className="hero-banner top-hero">
        <img src="/images/Signupbanner1.png" alt="Hero" className="hero-img" />
        <div className="hero-content">
          <h1>Design For Beauty</h1>
          <p>Summer Collection 2025</p>
          <Link to="/shop" className="btn hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2 className="section-title">Shop By Category</h2>
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="category-card">
              <img src={cat.img} alt={cat.name} />
              {cat.name.toLowerCase() === "women" ? (
                <Link className="btn" to="/womencollection">
                  {cat.name}
                </Link>
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    if (cat.name.toLowerCase() === "men")
                      navigate("/mencollection");
                    else navigate(`/category/${cat.name.toLowerCase()}`);
                  }}
                >
                  {cat.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <h2 className="section-title">Best Selling Product</h2>

        {/* Filters */}
        <div className="product-filters">
          {FILTERS.map((filter) => {
            const slug = Object.entries(CATEGORY_MAP).find(
              ([, label]) => label === filter
            )?.[0];
            return (
              <button
                key={filter}
                className={`btn${activeFilter === filter ? " active" : ""}`}
                onClick={() => {
                  if (filter === "All") navigate("/");
                  else navigate(`/category/${slug}`);
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.PID} product={product} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < products.length && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 8)}
          >
            Load More
          </button>
        )}
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-list">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section">
        <div className="promo-card">
          <img
            src="/images/Screenshot 2025-07-14 101841.png"
            alt="Promo"
            className="promo-img"
          />
          <div>
            <h3>Limited Time Offer</h3>
            <p>
              Get exclusive deals on our summer collection. Shop now and enjoy
              premium quality at the best prices!
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-list">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card">
              <strong>{r.name}</strong>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
        <p>© 2025 YourBrand. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer> */}
    </div>
  );
};

export default LandingPage;
