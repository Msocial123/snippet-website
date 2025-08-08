// import React from "react";
// import "./ProductCard.css";
// import { Link } from "react-router-dom";

// const extractFirstImage = (images) => {
//   if (!images) return "fallback.png"; // default fallback image

//   if (typeof images === "string") {
//     const parts = images.split(",");
//     return parts[0].trim(); // pick first image and remove spaces
//   }

//   return "fallback.png";
// };


// const ProductCard = ({ product }) => {
//  const image = (() => {
//   if (Array.isArray(product.Images)) {
//     return product.Images[0].trim();
//   } else if (typeof product.Images === "string" && product.Images.includes(",")) {
//     return product.Images.split(",")[0].trim();
//   } else if (typeof product.Images === "string") {
//     return product.Images.trim();
//   } else {
//     return "fallback.png"; // default fallback image
//   }
// })();
//   const rating = product.Rating || "4.2";
//   const reviewCount = product.ReviewCount || "659";

//   return (
//     <Link to={`/product/${product.PID}`} className="product-link">
//     <div className="product-card">
//       <div className="wishlist-icon">♡</div>

//       {/* <img
//         src={image}
//         alt={product.Name}
//         className="product-img"
//       /> */}
//      <img
//           src={`/images/${product.Images}`}
//           alt={product.Name}
//           className="product-img"
//          onError={(e) => (e.target.src = "/images/fallback.png")}
// />





   
//       <div className="product-info">
//         <p className="brand-name">{product.Brand}</p>
//         <p className="product-name">{product.Name}</p>

//         {/* ⭐ Rating Section */}
//         <div className="product-rating">
//           <span className="rating-value">{rating}</span>
//           <span className="star">★</span>
//           <span className="review-count">({reviewCount})</span>
//         </div>

//         <div className="price-row">
//           <span className="price">₹{product.Price}</span>
//         </div>
//       </div>
//     </div>
//     </Link>
//   );
// };

// export default ProductCard;



// import React from "react";
// import "./ProductCard.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ProductCard = ({ product }) => {
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

//   const rating = product.Rating || "4.2";
//   const reviewCount = product.ReviewCount || "659";

//   const handleAddToWishlist = async (e) => {
//     e.preventDefault(); // prevent link navigation

//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       toast.warning("Please log in to use wishlist");
//       return;
//     }

//     try {
//       await axios.post("/api/wishlist/add", {
//         uid: userId,
//         product: {
//           id: product.PID,
//           name: product.Name,
//           price: product.Price,
//           image: image,
//         },
//       });

//       toast.success("Added to wishlist!");
//     } catch (error) {
//       console.error("Wishlist add error:", error);
//       toast.error("Failed to add to wishlist");
//     }
//   };

//   return (
//     <Link to={`/product/${product.PID}`} className="product-link">
//       <div className="product-card">
//         <div className="wishlist-icon" onClick={handleAddToWishlist}>♡</div>

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
// import React from "react";
// import "./ProductCard.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ProductCard = ({ product }) => {
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

//   const rating = product.Rating || "4.2";
//   const reviewCount = product.ReviewCount || "659";

//   const handleAddToWishlist = async (e) => {
//     e.preventDefault(); // prevent link navigation

//    const UID = JSON.parse(localStorage.getItem("user"))?.UID;


// console.log("UID from localStorage:", UID); // Debug

// if (!UID || UID === "undefined" || UID === "null" ) {
//   toast.warning("Please log in to use wishlist");
//   return;
// }


//     try {
//       await axios.post("http://localhost:5000/api/wishlist/add", {
//         UID,
//         PID: product.PID,
//       });

//       toast.success("Added to wishlist!");
//     } catch (error) {
//       console.error("Wishlist add error:", error);
//       toast.error("Failed to add to wishlist");
//     }
//   };

//   return (
//     <Link to={`/product/${product.PID}`} className="product-link">
//       <div className="product-card">
//         <div className="wishlist-icon" onClick={handleAddToWishlist}>♡</div>

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
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {

  const [isWishlisted, setIsWishlisted] = useState(false);
  const UID = JSON.parse(localStorage.getItem("user"))?.UID;

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

//   const imageName = Array.isArray(product.Images)
//     ? product.Images[0]
//     : typeof product.Images === "string" && product.Images.includes(",")
//     ? product.Images.split(",")[0].trim()
//     : product.Images || "shirt1.jpg";

//   const image = `/images/${imageName}`;


  const rating = product.Rating || "4.2";
  const reviewCount = product.ReviewCount || "659";

  const handleAddToWishlist = async (e) => {
    e.preventDefault(); // prevent Link from navigating

    if (!UID || UID === "undefined" || UID === "null") {
      toast.warning("Please log in to use wishlist");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/wishlist/add", {
        UID,
        PID: product.PID,
      });

      if (response.status === 200) {
        setIsWishlisted(true);
        toast.success("❤️ Added to wishlist");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Wishlist add error:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <Link to={`/product/${product.PID}`} className="product-link">
      <div className="product-card">

        <div
          className={`wishlist-icon ${isWishlisted ? "wishlisted" : ""}`}
          onClick={handleAddToWishlist}
        >
          {isWishlisted ? "❤️" : "♡"}
        </div>

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
