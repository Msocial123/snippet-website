import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../Components/CartContext";
import CartDrawer from "../Components/CartDrawer";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [variantImages, setVariantImages] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        const imgArray = Array.isArray(data.Images)
          ? data.Images.map((img) => img.trim())
          : typeof data.Images === "string"
          ? data.Images.split(",").map((img) => img.trim())
          : [];
        setMainImage(`/images/${imgArray[0] || "default.jpg"}`);
      } catch (err) {
        console.error("Product error:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/${id}`);
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Review error:", err);
        setReviews([]);
      }
    };

    const fetchVariants = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/variants?pid=${id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setVariantImages(data);

          const colorSet = new Set();
          const sizeSet = new Set();
          
          data.forEach((v) => {
            if (typeof v.Color === "string" && v.Color.trim()) {
              colorSet.add(v.Color.trim());
            }
            if (typeof v.Size === "string" && v.Size.trim()) {
              sizeSet.add(v.Size.trim());
            }
          });

          setAvailableColors([...colorSet]);
          setAvailableSizes([...sizeSet]);

          // Set the first available color as default if not already set
          if (colorSet.size > 0 && !selectedColor) {
            const firstColor = [...colorSet][0];
            setSelectedColor(firstColor);
            // Find and set the image for the first color
            const variantForFirstColor = data.find(v => v.Color?.trim() === firstColor);
            if (variantForFirstColor?.VariantImage) {
              setMainImage(`/images/${variantForFirstColor.VariantImage.trim()}`);
            }
          }
        }
      } catch (err) {
        console.error("Variant fetch error:", err);
      }
    };

    fetchProduct();
    fetchReviews();
    fetchVariants();
  }, [id]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const variant = variantImages.find(
      v => v.Size?.trim().toLowerCase() === selectedSize.trim().toLowerCase() &&
           v.Color?.trim().toLowerCase() === selectedColor.trim().toLowerCase()
    );

    if (!variant?.VariantID) {
      alert("Selected variant not available.");
      return;
    }

    try {
      const storedUid = localStorage.getItem("uid") || 1;

      await addToCart({
        UID: parseInt(storedUid),
        PID: product.PID,
        VariantID: variant.VariantID,
        Quantity: quantity,
        Name: product.Name,
        Price: product.Price,
        ImageURL: variant?.VariantImage || "default.jpg",
        Size: selectedSize,
        Color: selectedColor,
      });

      setDrawerOpen(true);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart.");
    }
  };

  // Function to handle color selection from either image or color circle
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    const variant = variantImages.find(v => v.Color === color);
    if (variant?.VariantImage) {
      setMainImage(`/images/${variant.VariantImage.trim()}`);
    }
  };

  if (!product) return <div className="loading">Loading product...</div>;

  const images = Array.isArray(product.Images)
    ? product.Images
    : typeof product.Images === "string"
    ? product.Images.split(",").map(s => s.trim())
    : ["default.jpg"];

  return (
    <div className="product-page">
      <div className="product-header">
        {/* Left Column - Images */}
        <div className="product-images">
          <img 
            src={mainImage} 
            alt={product.Name} 
            className="main-image" 
            onClick={() => {
              // Find the color associated with the current main image
              const currentVariant = variantImages.find(v => 
                `/images/${v.VariantImage.trim()}` === mainImage
              );
              if (currentVariant?.Color) {
                handleColorSelection(currentVariant.Color);
              }
            }}
          />
          <div className="thumbnail-container">
            {images.map((img, i) => {
              // Find the variant associated with this image to get its color
              const variantForImage = variantImages.find(v => 
                v.VariantImage?.trim() === img.trim()
              );
              const colorForImage = variantForImage?.Color;
              
              return (
                <img
                  key={i}
                  src={`/images/${img.trim()}`}
                  alt={`Thumb ${i}`}
                  className="thumbnail"
                  onClick={() => {
                    setMainImage(`/images/${img.trim()}`);
                    if (colorForImage) {
                      handleColorSelection(colorForImage);
                    }
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default.jpg";
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Right Column - Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.Name}</h1>
          <p className="product-brand">{product.Brand}</p>
          
          <div className="price">₹{product.Price}</div>
          
          {/* Color Selector - Shows the currently selected color */}
          <div className="option-selector">
            <label className="option-label">Color</label>
            <div className="selected-color-display">
              Selected: <span style={{ 
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: selectedColor.toLowerCase(),
                marginLeft: '10px',
                verticalAlign: 'middle',
                borderRadius: '50%'
              }} />
              <span style={{ marginLeft: '5px' }}>{selectedColor}</span>
            </div>
            <div className="color-options">
              {availableColors.map((color) => (
                <div
                  key={color}
                  className={`color-option ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => handleColorSelection(color)}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selector */}
          <div className="option-selector">
            <label className="option-label">Size</label>
            <div className="size-options">
              {['S', 'M', 'L', 'XL']
                .filter(size => availableSizes.includes(size))
                .map((size) => (
                  <div
                    key={size}
                    className={`size-option ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label className="option-label">Quantity</label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="stock-info">
            {product.Stock} items in stock
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize} // Only size is required now since color is auto-selected
            >
              Add to Cart
            </button>
            {/* <button className="wishlist-btn">Add to Wishlist</button> */}
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="description-section">
        <h2 className="description-title">Description</h2>
        <p className="description-content">{product.Description}</p>
        <h2 className="description-title">Fit</h2>
        <p className="description-content">{product.Fit}<h2 className="description-title">Fabric</h2></p>
        
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
      
      {/* Reviews Section */}
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
                  {'★'.repeat(review.Rating)}{'☆'.repeat(5 - review.Rating)}
                </div>
                <p className="review-text">{review.Comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default ProductDetail;