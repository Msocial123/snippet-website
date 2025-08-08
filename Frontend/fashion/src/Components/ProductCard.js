import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageName = Array.isArray(product.Images)
    ? product.Images[0]
    : typeof product.Images === "string" && product.Images.includes(",")
    ? product.Images.split(",")[0].trim()
    : product.Images || "shirt1.jpg";

  const image = `/images/${imageName}`;

  const rating = product.Rating || "4.2";
  const reviewCount = product.ReviewCount || "659";

  return (
    <Link to={`/product/${product.PID}`} className="product-link">
      <div className="product-card">
        <div className="wishlist-icon">♡</div>

        <img
          src={image}
          alt={product.Name}
          className="product-img"
        />

        <div className="product-info">
          <p className="brand-name">{product.Brand}</p>
          <p className="product-name">{product.Name}</p>

          <div className="product-rating">
            <span className="rating-value">{rating}</span>
            <span className="star">★</span>
            <span className="review-count">({reviewCount})</span>
          </div>

          <div className="price-row">
            <span className="price">₹{product.Price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
