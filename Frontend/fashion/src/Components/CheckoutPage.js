


import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import "./CheckoutPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const [formData, setFormData] = useState({ phone: "", address: "" });
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [couponId, setCouponId] = useState(null);
const getImagePath = (image) => {
  if (!image) return "http://localhost:5000/uploads/default-product.jpg";
  const cleanName = image.replace(/^\/?(uploads|images)\//, ""); 
  return `http://localhost:5000/uploads/${cleanName}`;
};

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 49;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  const navigate = useNavigate();

  const applyCoupon = async () => {
    if (!coupon) {
      alert("Enter a coupon code!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/coupons/validate", {
        code: coupon,
        total: subtotal
      });
      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        setCouponId(res.data.couponId);
        alert(res.data.message);
      } else {
        setDiscount(0);
        alert("Invalid coupon code!");
      }
    } catch (err) {
      console.error(err);
      setDiscount(0);
      alert("Error applying coupon");
    }
  };

  const handlePlaceOrder = async () => {
    if (!formData.phone || !formData.address) {
      alert("⚠️ Please fill all required fields.");
      return;
    }
    if (!isValidPhone(formData.phone)) {
      alert("⚠️ Enter a valid 10-digit phone number.");
      return;
    }

    let uid;
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      uid = currentUser.UID || localStorage.getItem("uid") || localStorage.getItem("userId");
    } catch {
      uid = localStorage.getItem("uid") || localStorage.getItem("userId");
    }

    if (!uid) {
      alert("⚠️ Please log in to place an order.");
      return;
    }

    setIsLoading(true);

    try {
      const orderPayload = {
        uid: parseInt(uid),
        TotalPrice: total,
        PaymentMethod: "Pending", // 🔹 Default placeholder, will update from OrderDetailsPage
        ShippingAddress: formData.address,
        CouponCode: coupon || null,
        couponId: couponId || null,
        discountAmount: discount || 0,
        phone: formData.phone,
        items: cartItems.map((item) => ({
          productId: item.pid || item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await axios.post("http://localhost:5000/api/orders", orderPayload);

      if (res.data && res.data.orderId) {
        setOrderId(res.data.orderId);
        setOrderPlaced(true);
        navigate(`/order/${res.data.orderId}`); // Go to OrderDetailsPage
      } else {
        alert("❌ Order failed!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Could not place order.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <h2>✅ Order Confirmed!</h2>
        <p>Your order ID is <b>{orderId}</b></p>
        <p>A receipt has been sent to your email.</p>
        <button onClick={() => window.location.href = '/'} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-left">
        {/* Cart Items */}
        <div className="cart-items-box">
          <h3>Your Items</h3>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.variantId} className="checkout-item">
                <img
  src={getImagePath(item.image)}
  alt={item.name}
  onError={(e) => {
    e.target.src = "http://localhost:5000/uploads/default-product.jpg";
  }}
/>



                <div className="checkout-item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <div className="quantity-control">
                    <button id="decrease"onClick={() => decreaseQuantity(item.variantId)}>-</button>
                    <span>{item.quantity}</span>
                    <button id="increase" onClick={() => increaseQuantity(item.variantId)}>+</button>
                  </div>
                  <p className="price">₹{item.price * item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.variantId)}>Remove Item</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Info */}
        <div className="customer-info-box">
          <h3>Customer Information</h3>
          <form>
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
              maxLength={10}
            />
            {formData.phone && !isValidPhone(formData.phone) && (
              <p style={{ color: "red", fontSize: "0.85rem" }}>⚠ Phone number must be 10 digits.</p>
            )}
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </form>
        </div>
      </div>

      <div className="checkout-right">
        <div className="order-summary-box">
          <h3>Order Summary</h3>
          <p>Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
          <p>Shipping: <b>₹{shipping}</b></p>
          <p>Tax (10%): <b>₹{tax.toFixed(2)}</b></p>
          <p>Discount: <b>-₹{discount.toFixed(2)}</b></p>

          {/* Coupon Section */}
          <div className="coupon-section">
            <input type="text" placeholder="Enter Coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button type="button" onClick={applyCoupon}>Apply</button>
          </div>

          <h2>Total: ₹{total.toFixed(2)}</h2>
          <button className="place-order-btn" onClick={handlePlaceOrder} disabled={isLoading}>
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>

          <p className="secure-text">🔒 Your payment will be completed on Order Details page</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
