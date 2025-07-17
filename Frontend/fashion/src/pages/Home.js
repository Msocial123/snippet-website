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
    <div className="home-wrapper">
      {/* ✅ Banner section */}
      <div className="banner">
        <img
          src="/photo.png"
          alt="Banner"
          className="banner-image"
        />
      </div>

      {/* ✅ Product Grid */}
      <div className="product-section">
        <h2>New Arrivals</h2>

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

export default Home;
