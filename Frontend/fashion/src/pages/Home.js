// // import React, { useEffect, useState } from "react";
// // import ProductCard from "../Components/ProductCard";
// // import "./Home.css";

// // const Home = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/products")
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch products");
// //         }
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setProducts(Array.isArray(data) ? data : []);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching products:", err);
// //         setError("Something went wrong while fetching products.");
// //         setProducts([]);
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <div className="home-wrapper">
// //       {/* ✅ Banner section */}
// //       <div className="banner">
// //         <img
// //           src="/photo.png"
// //           alt="Banner"
// //           className="banner-image"
// //         />
// //       </div>

// //       {/* ✅ Product Grid */}
// //       <div className="product-section">
// //         <h2>New Arrivals</h2>

// //         {loading && <p>Loading products...</p>}
// //         {error && <p className="error">{error}</p>}

// //         <div className="product-grid">
// //           {Array.isArray(products) && products.length > 0 ? (
// //             products.map((product) => (
// //               <ProductCard key={product.PID} product={product} />
// //             ))
// //           ) : (
// //             !loading && !error && <p>No products found.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useEffect, useState } from "react";
// import ProductCard from "../Components/ProductCard";
// import "./Home.css"; // Import the CSS file

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(Array.isArray(data) ? data : []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setError("Something went wrong while fetching products.");
//         setProducts([]);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="home-full-width">
//       {/* ✅ Banner section */}
//       <div className="banner-container">
//         <img
//           src="/photo.png"
//           alt="Banner"
//           className="banner-image"
//         />
//       </div>

//       {/* ✅ Product Grid */}
//       <div className="products-container">
//         <h2 className="section-heading">
//           New Arrivals
//         </h2>

//         {loading && <p className="loading-text">Loading products...</p>}
//         {error && <p className="error-text">{error}</p>}

//         <div className="product-grid">
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((product) => (
//               <div key={product.PID} className="product-item">
//                 <ProductCard product={product} />
//               </div>
//             ))
//           ) : (
//             !loading && !error && <p className="no-products-text">No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Something went wrong while fetching products.");
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-full-width home-page">
      {/* ✅ Banner section */}
      <div className="home-banner">
        <img
          src="/photo.png"
          alt="Banner"
          className="banner-image"
        />
      </div>

      {/* ✅ Product Grid */}
      <div className="products-container home-products">
        <h2 className="section-heading">
          New Arrivals
        </h2>

        <div className="product-grid home-product-griid">
          {loading && <p className="loading-text">Loading products...</p>}
          {error && <p className="error-text">{error}</p>}
          
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.PID} className="product-item">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            !loading && !error && <p className="no-products-text">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;