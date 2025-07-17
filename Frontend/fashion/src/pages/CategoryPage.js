// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// // import "./CategoryPage.css";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setProducts([]);
    
//     fetch(`http://localhost:5000/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching category products:", err));
//   }, [category]);


//   return (
//     <div className="category-wrapper">
//       {/* <h2 className="category-title">{category.toUpperCase()}</h2>
//       <h2>{category.replace(/-/g, ' ')}</h2> */}

//       <div className="product-grid">
//         {products.map((product) => (
//           <ProductCard key={product.PID} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import "./CategoryPage.css"; // 👈 make sure to import your CSS here

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setProducts([]);
//     fetch(`http://localhost:5000/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching category products:", err));
//   }, [category]);

//   return (
//     <div className="category-wrapper">
//       {/* <h2 className="category-title">{category.toUpperCase()}</h2> */}
//       {/* <h2>{category.replace(/-/g, ' ')}</h2> */}

//       <div className="product-grid fade-in">
//         {products.map((product) => (
//           <ProductCard key={product.PID} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "./Home.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/category/${category}`)
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
  }, [category]);

  return (
    <div className="home-wrapper">
      <div className="banner">
        <img src="/photo.png" alt="Banner" className="banner-image" />
      </div>

      <div className="product-section">
        <h2>{category.toUpperCase()} Collection</h2>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">{error}</p>}

        <div className="product-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.PID} product={product} />
            ))
          ) : (
            !loading && !error && <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
