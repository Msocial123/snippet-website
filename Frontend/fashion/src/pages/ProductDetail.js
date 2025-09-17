

// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { CartContext } from "../Components/CartContext";
// import CartDrawer from "../Components/CartDrawer";
// import ProductCard from "../Components/ProductCard";
// import "./ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [variantImages, setVariantImages] = useState([]);
//   const [availableColors, setAvailableColors] = useState([]);
//   const [availableSizes, setAvailableSizes] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [similar, setSimilar] = useState([]);
//   const [isDrawerOpen, setDrawerOpen] = useState(false);

//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/products/${id}`);
//         const data = await res.json();
//         setProduct(data);

//         const imgArray = Array.isArray(data.Images)
//           ? data.Images.map((img) => img.trim())
//           : typeof data.Images === "string"
//           ? data.Images.split(",").map((img) => img.trim())
//           : [];
//         setMainImage(`http://localhost:5000/uploads/${imgArray[0] || "default.jpg"}`);

//         if (data.Category) {
//           const simRes = await fetch(`http://localhost:5000/api/products/category/${data.Category}`);
//           const simData = await simRes.json();
//           const filtered = Array.isArray(simData) ? simData.filter((p) => p.PID !== data.PID) : [];
//           setSimilar(filtered);
//         }
//       } catch (err) {
//         console.error("Product fetch error:", err);
//       }
//     };

//     const fetchVariants = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/variants?pid=${id}`);
//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setVariantImages(data);

//           const colorSet = new Set();
//           const sizeSet = new Set();

//           data.forEach((v) => {
//             if (v.Color?.trim()) colorSet.add(v.Color.trim());
//             if (v.Size?.trim()) sizeSet.add(v.Size.trim());
//           });

//           setAvailableColors([...colorSet]);
//           setAvailableSizes([...sizeSet]);

//           if (colorSet.size > 0 && !selectedColor) {
//             const firstColor = [...colorSet][0];
//             setSelectedColor(firstColor);
//             const variant = data.find((v) => v.Color?.trim() === firstColor);
//             if (variant?.VariantImage) {
//               setMainImage(`http://localhost:5000/uploads/${variant.VariantImage.trim()}`);
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Variant fetch error:", err);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/reviews/${id}`);
//         const data = await res.json();
//         setReviews(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Review fetch error:", err);
//         setReviews([]);
//       }
//     };

//     fetchData();
//     fetchVariants();
//     fetchReviews();
//   }, [id]);

//   const handleColorSelection = (color) => {
//     setSelectedColor(color);
//     const variant = variantImages.find((v) => v.Color === color);
//     if (variant?.VariantImage) {
//       setMainImage(`http://localhost:5000/uploads/${variant.VariantImage.trim()}`);
//     }
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = async () => {
//     if (!selectedSize) {
//       alert("Please select a size.");
//       return;
//     }

//     const variant = variantImages.find(
//       (v) =>
//         v.Size?.trim().toLowerCase() === selectedSize.trim().toLowerCase() &&
//         v.Color?.trim().toLowerCase() === selectedColor.trim().toLowerCase()
//     );

//     if (!variant?.VariantID) {
//       alert("Selected variant not available.");
//       return;
//     }

//     try {
//       const storedUid = localStorage.getItem("uid") || 1;

//       await addToCart({
//         UID: parseInt(storedUid),
//         PID: product.PID,
//         VariantID: variant.VariantID,
//         Quantity: quantity,
//         Name: product.Name,
//         Price: product.Price,
//         ImageURL: variant?.VariantImage || "default.jpg",
//         Size: selectedSize,
//         Color: selectedColor,
//       });

//       setDrawerOpen(true);
//     } catch (err) {
//       console.error("Add to cart error:", err);
//       alert("Failed to add item to cart.");
//     }
//   };

//   if (!product) return <div className="loading">Loading product...</div>;

//   const images = Array.isArray(product.Images)
//     ? product.Images
//     : typeof product.Images === "string"
//     ? product.Images.split(",").map((s) => s.trim())
//     : ["default.jpg"];

//   return (
//     <div className="product-page">
//       <div className="product-header">
//         <div className="product-images">
//           <img
//             src={mainImage}
//             alt={product.Name}
//             className="main-image"
//             onClick={() => {
//               const currentVariant = variantImages.find(
//                 (v) => `http://localhost:5000/uploads/${v.VariantImage.trim()}` === mainImage
//               );
//               if (currentVariant?.Color) handleColorSelection(currentVariant.Color);
//             }}
//           />
//           <div className="thumbnail-container">
//             {images.map((img, i) => {
//               const variant = variantImages.find((v) => v.VariantImage?.trim() === img.trim());
//               const color = variant?.Color;

//               return (
//                 <img
//                   key={i}
//                   src={`http://localhost:5000/uploads/${img.trim()}`}
//                   alt={`Thumb ${i}`}
//                   className="thumbnail"
//                   onClick={() => {
//                     setMainImage(`http://localhost:5000/uploads/${img.trim()}`);
//                     if (color) handleColorSelection(color);
//                   }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "http://localhost:5000/uploads/default.jpg";
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         <div className="product-info">
//           <h1 className="product-title">{product.Name}</h1>
//           <p className="product-brand">{product.Brand}</p>
//           <div className="price">₹{product.Price}</div>

//           <div className="option-selector">
//             <label className="option-label">Color</label>
//             <div className="selected-color-display">
//               Selected:{" "}
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "20px",
//                   height: "20px",
//                   backgroundColor: selectedColor.toLowerCase(),
//                   marginLeft: "10px",
//                   verticalAlign: "middle",
//                   borderRadius: "50%",
//                 }}
//               />
//               <span style={{ marginLeft: "5px" }}>{selectedColor}</span>
//             </div>
//             <div className="color-options">
//               {availableColors.map((color) => (
//                 <div
//                   key={color}
//                   className={`color-option ${selectedColor === color ? "selected" : ""}`}
//                   style={{ backgroundColor: color.toLowerCase() }}
//                   onClick={() => handleColorSelection(color)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="option-selector">
//             <label className="option-label">Size</label>
//             <div className="size-options">
//               {["S", "M", "L", "XL"]
//                 .filter((size) => availableSizes.includes(size))
//                 .map((size) => (
//                   <div
//                     key={size}
//                     className={`size-option ${selectedSize === size ? "selected" : ""}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </div>
//                 ))}
//             </div>
//           </div>

//           <div className="quantity-selector">
//             <label className="option-label">Quantity</label>
//             <div className="quantity-controls">
//               <button className="quantity-btn" onClick={decreaseQuantity}>
//                 -
//               </button>
//               <span className="quantity-value">{quantity}</span>
//               <button className="quantity-btn" onClick={increaseQuantity}>
//                 +
//               </button>
//             </div>
//           </div>

//           <div className="stock-info">{product.Stock} items in stock</div>

//           <div className="action-buttons">
//             <button
//               className="add-to-cart-btn"
//               onClick={handleAddToCart}
//               disabled={!selectedSize}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="description-section">
//         <h2 className="description-title">Description</h2>
//         <p className="description-content">{product.Description}</p>
//         <h2 className="description-title">Fit</h2>
//         <p className="description-content">{product.Fit}</p>
//         <h2 className="description-title">Fabric</h2>
//         <p className="description-content">{product.Fabric}</p>

//         <div className="benefits-list">
//           <div className="benefit-item">
//             <span className="benefit-title">Free Shipping</span>
//             <span className="benefit-text">Order over ₹50</span>
//           </div>
//           <div className="benefit-item">
//             <span className="benefit-title">Easy Return</span>
//             <span className="benefit-text">30-day return policy</span>
//           </div>
//         </div>
//       </div>

//       <div className="reviews-section">
//         <h2 className="reviews-title">Customer Reviews</h2>
//         <div className="reviews-container">
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((review, i) => (
//               <div key={review.ReviewID || i} className="review">
//                 <div className="review-user">{review.FirstName || "User"}</div>
//                 <div className="review-rating">
//                   {"★".repeat(review.Rating)}{"☆".repeat(5 - review.Rating)}
//                 </div>
//                 <p className="review-text">{review.Comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="similar-products-section">
//         <h3>Similar Products</h3>
//         <div className="product-grid">
//           {similar.length === 0 ? (
//             <p>No similar products found.</p>
//           ) : (
//             similar.slice(0, 4).map((simProduct) => (
//               <ProductCard key={simProduct.PID} product={simProduct} />
//             ))
//           )}
//         </div>
//       </div>

//       <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Components/CartContext";
import CartDrawer from "../Components/CartDrawer";
import ProductCard from "../Components/ProductCard";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [variantImages, setVariantImages] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data.Images) {
          const imgArray = Array.isArray(data.Images)
            ? data.Images.map((img) => (img ? img.trim() : ""))
            : typeof data.Images === "string"
            ? data.Images.split(",").map((img) => (img ? img.trim() : ""))
            : [];
          const cleanImages = imgArray.filter(Boolean);
          setMainImage(
            `http://localhost:5000/uploads/${cleanImages[0] || "default.jpg"}`
          );
        }

        if (data.Category) {
          const simRes = await fetch(
            `http://localhost:5000/api/products/category/${data.Category}`
          );
          const simData = await simRes.json();
          const filtered = Array.isArray(simData)
            ? simData.filter((p) => p.PID !== data.PID)
            : [];
          setSimilar(filtered);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    const fetchVariants = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/variants?pid=${id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setVariantImages(data);

          const colorSet = new Set();
          data.forEach((v) => {
            if (v.Color && typeof v.Color === "string") {
              colorSet.add(v.Color.trim());
            }
          });
          setAvailableColors([...colorSet]);

          if (colorSet.size > 0) {
            const firstColor = [...colorSet][0];
            handleColorSelection(firstColor, data);
          }
        }
      } catch (err) {
        console.error("Variant fetch error:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/${id}`);
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Review fetch error:", err);
        setReviews([]);
      }
    };

    fetchData();
    fetchVariants();
    fetchReviews();
    // eslint-disable-next-line
  }, [id]);

  const uniqueVariantsByColor = React.useMemo(() => {
  const seenColors = new Set();
  return variantImages.filter(variant => {
    if (!variant.Color) return false;
    if (seenColors.has(variant.Color.toLowerCase())) return false;
    seenColors.add(variant.Color.toLowerCase());
    return true;
  });
}, [variantImages]);


  const handleColorSelection = (color, variants = variantImages) => {
    if (!color) return;
    setSelectedColor(color);

    const colorVariants = variants.filter(
      (v) =>
        v.Color && v.Color.trim().toLowerCase() === color.trim().toLowerCase()
    );

    if (colorVariants.length > 0) {
      setSelectedVariant(colorVariants[0]);

      if (colorVariants[0]?.VariantImage) {
        setMainImage(
          `http://localhost:5000/uploads/${colorVariants[0].VariantImage.trim()}`
        );
      }

      const sizesForColor = [
        ...new Set(
          colorVariants
            .map((v) =>
              v.Size && typeof v.Size === "string" ? v.Size.trim() : ""
            )
            .filter(Boolean)
        ),
      ];
      setAvailableSizes(sizesForColor);
      setSelectedSize("");
    }
  };

  const handleSizeSelection = (size) => {
    if (!size) return;
    setSelectedSize(size);

    const variant = variantImages.find(
      (v) =>
        v.Color &&
        v.Color.trim().toLowerCase() === selectedColor.trim().toLowerCase() &&
        v.Size &&
        v.Size.trim().toLowerCase() === size.trim().toLowerCase()
    );

    if (variant) {
      setSelectedVariant(variant);
      if (variant?.VariantImage) {
        setMainImage(
          `http://localhost:5000/uploads/${variant.VariantImage.trim()}`
        );
      }
    }
  };

  const handleThumbnailClick = (variant) => {
    if (!variant) return;

    setMainImage(
      `http://localhost:5000/uploads/${variant.VariantImage?.trim()}`
    );

    if (variant.Color) {
      handleColorSelection(variant.Color);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedVariant) {
      alert("Please select size and color.");
      return;
    }
    if (selectedVariant.Stock <= 0) {
      alert("This variant is out of stock.");
      return;
    }

    try {
      const storedUid = localStorage.getItem("uid") || 1;

      await addToCart({
        UID: parseInt(storedUid),
        PID: product.PID,
        VariantID: selectedVariant.VariantID,
        Quantity: quantity,
        Name: product.Name,
        Price: selectedVariant.Price || product.Price,
        ImageURL: selectedVariant?.VariantImage || "default.jpg",
        Size: selectedSize,
        Color: selectedColor,
      });

      setDrawerOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart.");
    }
  };

  if (!product) return <div className="loading">Loading product...</div>;

  return (
    <div className="product-page">
      <div className="product-header">
        <div className="product-images">
          <img src={mainImage} alt={product.Name} className="main-image" />

          {/* <div className="thumbnail-container">
            {variantImages.map((variant, i) => {
              if (!variant?.VariantImage) return null;
              return (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/${variant.VariantImage.trim()}`}
                  alt={`Thumb ${i}`}
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(variant)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "http://localhost:5000/uploads/default.jpg";
                  }}
                />
              );
            })}
          </div> */}
          <div className="thumbnail-container">
  {uniqueVariantsByColor.map((variant, i) => (
    <img
      key={i}
      src={`http://localhost:5000/uploads/${variant.VariantImage.trim()}`}
      alt={`Thumb ${i}`}
      className="thumbnail"
      onClick={() => handleThumbnailClick(variant)}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "http://localhost:5000/uploads/default.jpg";
      }}
    />
  ))}
</div>

        </div>

        <div className="product-info">
          <h1 className="product-title">{product.Name}</h1>
          <p className="product-brand">{product.Brand}</p>
          <div className="price">₹{selectedVariant?.Price || product.Price}</div>

          <div className="option-selector">
            <label className="option-label">Color</label>
            <div className="color-options">
              {availableColors.map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => handleColorSelection(color)}
                />
              ))}
            </div>
            {selectedColor && <p>Selected Color: {selectedColor}</p>}
          </div>

          <div className="option-selector">
            <label className="option-label">Size</label>
            <div className="size-options">
              {availableSizes.map((size) => {
                const variant = variantImages.find(
                  (v) =>
                    v.Size && v.Size.trim().toLowerCase() === size.toLowerCase() &&
                    v.Color &&
                    v.Color.trim().toLowerCase() === selectedColor.toLowerCase()
                );
                const isDisabled = !variant || variant.Stock <= 0;

                return (
                  <div
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "selected" : ""
                    } ${isDisabled ? "disabled" : ""}`}
                    onClick={() => !isDisabled && handleSizeSelection(size)}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="quantity-selector">
            <label className="option-label">Quantity</label>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={decreaseQuantity}>
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          <div className="stock-info">
            {selectedVariant
              ? selectedVariant.Stock > 0
                ? selectedVariant.Stock < 5
                  ? `Only ${selectedVariant.Stock} left in stock!`
                  : `${selectedVariant.Stock} in stock`
                : "Out of stock"
              : "Select size & color to see availability"}
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedVariant || selectedVariant.Stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="description-section">
        <h2 className="description-title">Description</h2>
        <p className="description-content">{product.Description}</p>
        <h2 className="description-title">Fit</h2>
        <p className="description-content">{product.Fit}</p>
        <h2 className="description-title">Fabric</h2>
        <p className="description-content">{product.Fabric}</p>

        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-title">Free Shipping</span>
            <span className="benefit-text">Order over ₹50</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-title">Easy Return</span>
            <span className="benefit-text">30-day return policy</span>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review, i) => (
              <div key={review.ReviewID || i} className="review">
                <div className="review-user">{review.FirstName || "User"}</div>
                <div className="review-rating">
                  {"★".repeat(review.Rating)}
                  {"☆".repeat(5 - review.Rating)}
                </div>
                <p className="review-text">{review.Comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

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

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default ProductDetail;

