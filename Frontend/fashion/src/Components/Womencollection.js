
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './WomenCollection.css';
// // import { Link } from "react-router-dom";
// // import ProductCard from "./ProductCard";

// // const FILTERS = ['All', 'Casual', 'Ethnic', 'Party Wear', 'Formal', 'Western'];

// // const WomenCollection = () => {
// //   const [products, setProducts] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [activeFilter, setActiveFilter] = useState('All');

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/products/women")
// //       .then(res => {
// //         setProducts(res.data);
// //         setFiltered(res.data);
// //       })
// //       .catch(err => console.error('❌ Fetch error:', err));
// //   }, []);

// //   const handleFilter = (category) => {
// //     setActiveFilter(category);
// //     if (category === 'All') {
// //       setFiltered(products);
// //     } else {
// //       const filteredItems = products.filter(product =>
// //         product.Category && product.Category.toLowerCase() === category.toLowerCase()
// //       );
// //       setFiltered(filteredItems);
// //     }
// //   };

  

// //   return (
    
// //     <div className="women-collection-root">
// //       {/* Hero Banner */}
// //       <div className="hero-banner">
// //         <img src="/images/womenbanner.jpg" alt="Women's Fashion Banner" />
// //         <div className="hero-text">
// //           <h1>Explore the Latest Trends</h1>
// //           <p>Discover handpicked styles curated just for you</p>
// //         </div>
// //       </div>

// //       <h2 className="section-title">Women's Collection</h2>

// //       {/* Filter Buttons */}
// //       <div className="filter-buttons">
// //         {FILTERS.map(filter => (
// //           <button
// //             key={filter}
// //             onClick={() => handleFilter(filter)}
// //             className={activeFilter === filter ? 'active-filter' : ''}
// //           >
// //             {filter}
// //           </button>
// //         ))}
// //       </div>

// //       {filtered.length === 0 ? (
// //         <p className="no-products-message">No products found for selected category.</p>
// //       ) : (
// //         <div className="product-grid">
// //   {filtered.map(product => (
// //     <ProductCard key={product.PID} product={product} />
// //   ))}
// // </div>
// //       )}
// //     </div>
  
// //   );
// // };

// // export default WomenCollection;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './WomenCollection.css';
// import { Link } from "react-router-dom";
// import ProductCard from "./ProductCard";

// const FILTERS = ['All', 'Casual', 'Ethnic', 'Party Wear', 'Formal', 'Western'];

// const WomenCollection = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products/women")
//       .then(res => {
//         setProducts(res.data);
//         setFiltered(res.data);
//       })
//       .catch(err => console.error('❌ Fetch error:', err));
//   }, []);

//   const handleFilter = (category) => {
//     setActiveFilter(category);
//     if (category === 'All') {
//       setFiltered(products);
//     } else {
//       const filteredItems = products.filter(product =>
//         product.Category && product.Category.toLowerCase() === category.toLowerCase()
//       );
//       setFiltered(filteredItems);
//     }
//   };

//   return (
//     <div className="women-collection-root">
//       {/* Hero Banner Section */}
//       <div className="hero-section">
//         {/* Left: Banner Image */}
//         <div className="hero-banner">
//           <img src="/images/partywear1.png" alt="Women's Fashion Banner" />
//           <div className="hero-text">
//             <h1>Explore the Latest Trends</h1>
//             <p>Discover handpicked styles curated just for you</p>
//             <p>Flat 50% OFF on Casual Wear</p>
//           </div>
//         </div>

//         {/* Right: Offer/Quote Section */}
//         {/* <div className="offer-section">
//           <h2>✨ Special Offers ✨</h2>
//           <ul>
//             <li>🔥 Flat 50% OFF on Casual Wear</li>
//             <li>🎉 Buy 1 Get 1 Free – Party Collection</li>
//             <li>💃 Ethnic Styles Starting at ₹799</li>
//             <li>🛍️ Free Shipping on Orders Above ₹999</li>
//           </ul>
//         </div> */}
//       </div>

//       <h2 className="section-title">Women's Collection</h2>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         {FILTERS.map(filter => (
//           <button
//             key={filter}
//             onClick={() => handleFilter(filter)}
//             className={activeFilter === filter ? 'active-filter' : ''}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {filtered.length === 0 ? (
//         <p className="no-products-message">No products found for selected category.</p>
//       ) : (
//         <div className="product-grid">
//           {filtered.map(product => (
//             <ProductCard key={product.PID} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WomenCollection;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WomenCollection.css';
import ProductCard from "./ProductCard";

const FILTERS = ['All', 'Casual', 'Ethnic', 'Party Wear', 'Formal', 'Western'];

const WomenCollection = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/products/women")
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Fetch error:', err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFiltered(products);
    } else {
      const filteredItems = products.filter(product =>
        product.Category && product.Category.toLowerCase() === category.toLowerCase()
      );
      setFiltered(filteredItems);
    }
  };

  return (
    <div className="home-full-width women-collection-root">
      {/* Large Fullscreen Banner */}
      <div className="home-banner">
        <img src="/images/partywear1.png" alt="Women's Fashion Banner" />
      </div>

      {/* Section Heading */}
      <h2 className="section-heading">Women's Collection</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={activeFilter === filter ? 'active-filter' : ''}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Error / Loading / Product Grid */}
      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="no-products-text">No products found for selected category.</p>
      ) : (
        <div className="products-container">
          <div className="product-grid">
            {filtered.map(product => (
              <div key={product.PID} className="product-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenCollection;
