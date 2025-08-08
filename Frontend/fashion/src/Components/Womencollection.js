// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './WomenCollection.css'; // Optional: only if you have custom styling

// const WomenCollection = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch only female-targeted products from backend
//     axios.get("http://localhost:5000/api/products/women")
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('❌ Fetch error:', err));
//   }, []);

//   return (
//     <div className="women-collection-root">
//       <h2 className="section-title">Women's Collection</h2>

//       {products.length === 0 ? (
//         <p className="no-products-message">No products found in the women’s collection.</p>
//       ) : (
//         <div className="product-grid">
//           {products.map(product => (
//             <div key={product.PID} className="product-card">
//               <img
//                 src={`/images/${product.Images}`}
//                 alt={product.Name}
//                 className="product-img"
//               />

//               <div className="product-info">
//                 <div className="product-brand">{product.Brand || 'Brand Name'}</div>
//                 <div className="product-name">{product.Name}</div>
//                 <div className="product-desc">{product.Description || 'No description available.'}</div>
//                 <div className="product-price">₹ {product.Price}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WomenCollection;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './WomenCollection.css';

// const WomenCollection = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products/women")
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('❌ Fetch error:', err));
//   }, []);

//   return (
//     <div className="women-collection-root">
//       {/* Hero Banner */}
//       <div className="hero-banner">
//         <img src="/images/womenbanner.jpg" alt="Women's Fashion Banner" />
//         <div className="hero-text">
//           <h1>Explore the Latest Trends</h1>
//           <p>Discover handpicked styles curated just for you</p>
//         </div>
//       </div>

//       <h2 className="section-title">Women's Collection</h2>

//       {products.length === 0 ? (
//         <p className="no-products-message">No products found in the women’s collection.</p>
//       ) : (
//         <div className="product-grid">
//           {products.map(product => (
//             <div key={product.PID} className="product-card">
//               <img
//                 src={`/images/${product.Images}`}
//                 alt={product.Name}
//                 className="product-img"
//               />
//               <div className="product-info">
//                 <div className="product-brand">{product.Brand || 'Brand Name'}</div>
//                 <div className="product-name">{product.Name}</div>
//                 <div className="product-desc">{product.Description || 'No description available.'}</div>
//                 <div className="product-price">₹ {product.Price}</div>
//               </div>
//             </div>
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
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FILTERS = ['All', 'Casual', 'Ethnic', 'Party Wear', 'Formal', 'Western'];

const WomenCollection = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/women")
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('❌ Fetch error:', err));
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
    
    <div className="women-collection-root">
      {/* Hero Banner */}
      <div className="hero-banner">
        <img src="/images/womenbanner.jpg" alt="Women's Fashion Banner" />
        <div className="hero-text">
          <h1>Explore the Latest Trends</h1>
          <p>Discover handpicked styles curated just for you</p>
        </div>
      </div>

      <h2 className="section-title">Women's Collection</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={activeFilter === filter ? 'active-filter' : ''}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="no-products-message">No products found for selected category.</p>
      ) : (
        <div className="product-grid">
  {filtered.map(product => (
    <ProductCard key={product.PID} product={product} />
  ))}
</div>
      )}
    </div>
  
  );
};

export default WomenCollection;
