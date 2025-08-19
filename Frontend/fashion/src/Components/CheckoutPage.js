import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import "./CheckoutPage.css";
import axios from "axios";


const CheckoutPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  // State for form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [onlineOption, setOnlineOption] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Subtotals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 49;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax - discount;

  // Handle coupon validation
  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("Coupon applied: 10% off!");
    } else if (coupon === "FREESHIP") {
      setDiscount(shipping);
      alert("Coupon applied: Free Shipping!");
    } else {
      alert("Invalid coupon code!");
      setDiscount(0);
    }
  };

  // Handle order placement
  // const handlePlaceOrder = () => {
  //   if (
  //     !formData.firstName ||
  //     !formData.phone ||
  //     !formData.address ||
  //     !paymentMethod
  //   ) {
  //     alert("⚠️ Please fill all required fields & select payment.");
  //     return;
  //   }

  //   const newOrderId = "ORD-" + Math.floor(Math.random() * 1000000);
  //   setOrderId(newOrderId);
  //   setOrderPlaced(true);
  // };

  // if (orderPlaced) {
  //   return (
  //     <div className="order-success">
  //       <h2>✅ Order Confirmed!</h2>
  //       <p>
  //         Your order ID is <b>{orderId}</b>
  //       </p>
  //       <p>A receipt has been sent to your email.</p>
  //     </div>
  //   );
  // }

// inside CheckoutPage.jsx

const handlePlaceOrder = async () => {
  if (
    !formData.firstName ||
    !formData.phone ||
    !formData.address ||
    !paymentMethod
  ) {
    alert("⚠️ Please fill all required fields & select payment.");
    return;
  }

  try {
    const orderPayload = {
      user_id: 1, // 👈 replace with logged-in user id if available
      total_amount: subtotal + shipping + tax,
      payment_method: paymentMethod,
      shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
      coupon_code: coupon || null,
      discount,
      final_amount: total,
      status: "Pending",
      items: cartItems.map((item) => ({
        product_id: item.productId || item.variantId, // 👈 make sure this matches DB schema
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const res = await axios.post("http://localhost:5000/api/orders", orderPayload);

    if (res.data && res.data.order_id) {
      setOrderId(res.data.order_id);
      setOrderPlaced(true);
    } else {
      alert("❌ Order failed to save!");
    }
  } catch (err) {
    console.error("Order placement error:", err);
    alert("⚠️ Could not place order. Please try again.");
  }
};


  return (
    <div className="checkout-wrapper">
      {/* LEFT SECTION */}
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
                  src={
                    item.image
                      ? `/images/${item.image.replace(/^\/?images\//, "")}`
                      : "/images/default-product.jpg"
                  }
                  alt={item.name}
                />
                <div className="checkout-item-details">
                  <h4>{item.name}</h4>
                  <p>
                    Size: {item.size}, Color: {item.color}
                  </p>
                  <div className="quantity-control">
                    <button  onClick={() => decreaseQuantity(item.variantId)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.variantId)}>
                      +
                    </button>
                  </div>
                  <p className="price">₹{item.price * item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.variantId)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Info */}
        <div className="customer-info-box">
          <h3>Customer Information</h3>
          <form>
            {Object.keys(formData).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}
          </form>
        </div>

        {/* Payment Options */}
        <div className="payment-box">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>

          {paymentMethod === "Online" && (
            <div className="online-options">
              <label>
                <input
                  type="radio"
                  name="online"
                  value="Card"
                  checked={onlineOption === "Card"}
                  onChange={(e) => setOnlineOption(e.target.value)}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="online"
                  value="PayPal"
                  checked={onlineOption === "PayPal"}
                  onChange={(e) => setOnlineOption(e.target.value)}
                />
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="online"
                  value="Wallet"
                  checked={onlineOption === "Wallet"}
                  onChange={(e) => setOnlineOption(e.target.value)}
                />
                Digital Wallet
              </label>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION - Order Summary */}
      <div className="checkout-right">
        <div className="order-summary-box">
          <h3>Order Summary</h3>
          <p>
            Subtotal: <b>₹{subtotal.toFixed(2)}</b>
          </p>
          <p>
            Shipping: <b>₹{shipping}</b>
          </p>
          <p>
            Tax (10%): <b>₹{tax.toFixed(2)}</b>
          </p>
          <p>
            Discount: <b>-₹{discount.toFixed(2)}</b>
          </p>

          {/* Coupon Section */}
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter Coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="button" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          <h2>Total: ₹{total.toFixed(2)}</h2>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>

          <p className="secure-text">🔒 Your payment is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
