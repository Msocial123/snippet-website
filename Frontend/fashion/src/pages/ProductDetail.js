// // // src/pages/ProductDetail.jsx
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import "./ProductDetail.css";

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);

// //   useEffect(() => {
// //     fetch(`http://localhost:5000/api/products/${id}`)
// //       .then((res) => res.json())
// //       .then((data) => setProduct(data))
// //       .catch((err) => console.error("Error fetching product:", err));
// //   }, [id]);

// //   if (!product) return <p>Loading...</p>;

// //   const images = Array.isArray(product.Images)
// //     ? product.Images
// //     : product.Images?.split(",")[0]
// //     : product.Images || "/shirt1.jpg";

// //   return (
// //     <div className="product-detail-container">
// //       <div className="left">
// //         <img src={images[0]} alt={product.Name} className="main-image" />
// //       </div>
// //       <div className="right">
// //         <h2>{product.Name}</h2>
// //         <p className="brand">Brand: {product.Brand}</p>
// //         <p className="price">Price: ₹{product.Price}</p>
// //         <p className="desc">{product.Description}</p>
// //         <p className="rating">⭐ {product.Rating} ({product.ReviewCount} reviews)</p>
// //         <button className="buy-btn">Add to Cart</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetail;

// // src/pages/ProductDetail.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error("Failed to load product:", err));
//   }, [id]);

//   if (!product) return <p>Loading product...</p>;

//   const image = Array.isArray(product.Images)
//     ? product.Images[0]
//     : typeof product.Images === "string" && product.Images.includes(",")
//     ? product.Images.split(",")[0]
//     : product.Images || "/shirt1.jpg";

//   return (
//     <div className="product-detail-container">
//       <img src={image} alt={product.Name} className="product-detail-img" />
//       <h2>{product.Name}</h2>
//       <p>Brand: {product.Brand}</p>
//       <p>Price: ₹{product.Price}</p>
//       <p>Rating: {product.Rating} ★</p>
//       <p>Reviews: {product.ReviewCount}</p>
//       <p>{product.Description}</p>
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ProductDetail.css";


// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);

//  useEffect(() => {
//   // Fetch product details
//   fetch(`http://localhost:5000/api/products/${id}`)
//     .then((res) => res.json())
//     .then((data) => setProduct(data))
//     .catch((err) => console.error("Product error:", err));

//   // Fetch reviews
//   fetch(`http://localhost:5000/api/reviews/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       if (Array.isArray(data)) {
//         setReviews(data);
//       } else {
//         console.warn("Expected an array but got:", data);
//         setReviews([]); // fallback
//       }
//     })
//     .catch((err) => {
//       console.error("Review error:", err);
//       setReviews([]);
//     });
// }, [id]);


//   if (!product) return <p>Loading product...</p>;

//   const image = Array.isArray(product.Images)
//     ? product.Images[0]
//     : typeof product.Images === "string" && product.Images.includes(",")
//     ? product.Images.split(",")[0]
//     : product.Images || "/shirt1.jpg";

//   return (
//   <div className="product-detail-container">
//     <img src={image} alt={product.Name} className="product-detail-img" />
//     <h2>{product.Name}</h2>
//     <p>Brand: {product.Brand}</p>
//     <p>Price: ₹{product.Price}</p>
    

//     {/* ✅ Show Review from DB */}
//     {product.Review && <p><strong>Product Summary:</strong> {product.Review}</p>}

//     <p>{product.Description}</p>

//     <h3>Customer Reviews</h3>
//     {reviews.length === 0 ? (
//       <p>No reviews yet.</p>
//     ) : (
//     reviews.map((review, index) => (
//   <div key={index} className="review">
//     <strong>{review.UserName || "User"}</strong>
//     <p>Rating: {review.Rating} ★</p>
//     <p>{review.Comment}</p>
//   </div>
// ))
//     )}
//   </div>
// );

// };

// export default ProductDetail;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ProductCard from "../Components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    // Fetch product details
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        // Fetch similar products by category (excluding current product)
        if (data && data.Category) {
          fetch(`http://localhost:5000/api/products/category/${data.Category}`)
            .then((res) => res.json())
            .then((simData) => {
              // Filter out the current product
              const filtered = Array.isArray(simData)
                ? simData.filter((p) => p.PID !== data.PID)
                : [];
              setSimilar(filtered);
            })
            .catch((err) => {
              console.error("Similar products error:", err);
              setSimilar([]);
            });
        } else {
          setSimilar([]);
        }
      })
      .catch((err) => console.error("Product error:", err));

    // Fetch reviews
    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch((err) => {
        setReviews([]);
      });
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  const image = Array.isArray(product.Images)
    ? product.Images[0]
    : typeof product.Images === "string" && product.Images.includes(",")
    ? product.Images.split(",")[0]
    : product.Images || "/shirt1.jpg";

  return (
    <div className="product-detail-container">
      <img src={image} alt={product.Name} className="product-detail-img" />
      <h2>{product.Name}</h2>
      <p>Brand: {product.Brand}</p>
      <p>Price: ₹{product.Price}</p>

      {/* ✅ Show Review from DB */}
      {product.Review && (
        <p>
          <strong>Product Summary:</strong> {product.Review}
        </p>
      )}

      <p>{product.Description}</p>

      <h3>Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <strong>{review.UserName || "User"}</strong>
            <p>Rating: {review.Rating} ★</p>
            <p>{review.Comment}</p>
          </div>
        ))
      )}

      {/* --- Similar Products Section --- */}
      <div className="similar-products-section">
        <h3>Similar Products</h3>
        <div className="product-grid">
          {similar.length === 0 ? (
            <p>No similar products found.</p>
          ) : (
            similar.slice(0, 4).map((simProduct) => (
              <ProductCard key={simProduct.PID} product={simProduct} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;