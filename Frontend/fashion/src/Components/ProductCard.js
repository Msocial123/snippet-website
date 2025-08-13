
// import React, { useEffect, useState } from "react";
// import "./ProductCard.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ProductCard = ({ product }) => {

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const UID = JSON.parse(localStorage.getItem("user"))?.UID;

//   const image = (() => {
//     if (Array.isArray(product.Images)) {
//       return product.Images[0].trim();
//     } else if (typeof product.Images === "string" && product.Images.includes(",")) {
//       return product.Images.split(",")[0].trim();
//     } else if (typeof product.Images === "string") {
//       return product.Images.trim();
//     } else {
//       return "fallback.png";
//     }
//   })();

// //   const imageName = Array.isArray(product.Images)
// //     ? product.Images[0]
// //     : typeof product.Images === "string" && product.Images.includes(",")
// //     ? product.Images.split(",")[0].trim()
// //     : product.Images || "shirt1.jpg";

// //   const image = `/images/${imageName}`;


//   const rating = product.Rating || "4.2";
//   const reviewCount = product.ReviewCount || "659";

//   const handleAddToWishlist = async (e) => {
//     e.preventDefault(); // prevent Link from navigating

//     if (!UID || UID === "undefined" || UID === "null") {
//       toast.warning("Please log in to use wishlist");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/wishlist/add", {
//         UID,
//         PID: product.PID,
//       });

//       if (response.status === 200) {
//         setIsWishlisted(true);
//         toast.success("❤️ Added to wishlist");
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Wishlist add error:", error);
//       toast.error("Failed to add to wishlist");
//     }
//   };

//   return (
//     <Link to={`/product/${product.PID}`} className="product-link">
//       <div className="product-card">

//         <div
//           className={`wishlist-icon ${isWishlisted ? "wishlisted" : ""}`}
//           onClick={handleAddToWishlist}
//         >
//           {isWishlisted ? "❤️" : "♡"}
//         </div>

//         <img
//           src={`/images/${image}`}
//           alt={product.Name}
//           className="product-img"
//           onError={(e) => (e.target.src = "/images/fallback.png")}

//         />

//         <div className="product-info">
//           <p className="brand-name">{product.Brand}</p>
//           <p className="product-name">{product.Name}</p>

//           <div className="product-rating">
//             <span className="rating-value">{rating}</span>
//             <span className="star">★</span>
//             <span className="review-count">({reviewCount})</span>
//           </div>

//           <div className="price-row">
//             <span className="price">₹{product.Price}</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;



import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ product, disableWishlist = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const UID = JSON.parse(localStorage.getItem("user"))?.UID;

  useEffect(() => {
    // Optional: check if this product is in wishlist on load
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some(item => item.PID === product.PID));
  }, [product.PID]);

  const handleToggleWishlist = async (e) => {
    e.preventDefault(); // prevent link navigation

    if (!UID) {
      toast.warning("Please log in to use wishlist");
      return;
    }

    try {
      if (isWishlisted) {
        await axios.delete("http://localhost:5000/api/wishlist/remove", {
          data: { UID, PID: product.PID },
        });
        setIsWishlisted(false);
        toast.info("💔 Removed from wishlist");
      } else {
        await axios.post("http://localhost:5000/api/wishlist/add", {
          UID,
          PID: product.PID,
        });
        setIsWishlisted(true);
        toast.success("❤️ Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const image = (() => {
    if (Array.isArray(product.Images)) {
      return product.Images[0].trim();
    } else if (typeof product.Images === "string" && product.Images.includes(",")) {
      return product.Images.split(",")[0].trim();
    } else if (typeof product.Images === "string") {
      return product.Images.trim();
    } else {
      return "fallback.png";
    }
  })();

  const rating = product.Rating || "4.2";
  const reviewCount = product.ReviewCount || "659";

  return (
    <Link to={`/product/${product.PID}`} className="product-link">
      <div className="product-card">
        
        {!disableWishlist && (
          <div
            className={`wishlist-icon ${isWishlisted ? "wishlisted" : ""}`}
            onClick={handleToggleWishlist}
          >
            {isWishlisted ? "❤️" : "♡"}
          </div>
        )}

        <img
          src={`/images/${image}`}
          alt={product.Name}
          className="product-img"
          onError={(e) => (e.target.src = "/images/fallback.png")}
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
