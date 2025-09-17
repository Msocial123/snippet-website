import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) return;
    fetch(`http://localhost:5000/api/products/category/${category}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
        setError("");
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Something went wrong while fetching products.");
        setProducts([]);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="category-page-container">
      <div className="banner">
        <img src="/photo.png" alt="Banner" className="banner-image" />
      </div>
      <div className="product-section">
        <h2>{category.toUpperCase()} Collection</h2>
        {loading && <p className="loading-text">Loading products...</p>}
        {error && <p className="error">{error}</p>}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
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
