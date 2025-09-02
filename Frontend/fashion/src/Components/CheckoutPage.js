// // import React, { useContext, useState } from "react";
// // import { CartContext } from "./CartContext";
// // import "./CheckoutPage.css";
// // import axios from "axios";
// // import OrderDetailsPage from "./OrderDetailsPage";
// // import { useNavigate } from "react-router-dom";


// // const CheckoutPage = () => {
// //   const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
// //     useContext(CartContext);

// //   // State for form
// //   const [formData, setFormData] = useState({
// //     phone: "",
// //     address: ""
// //   });
// // const isValidPhone = (phone) => /^\d{10}$/.test(phone);

// //   const [coupon, setCoupon] = useState("");
// //   const [discount, setDiscount] = useState(0);
// //   const [paymentMethod, setPaymentMethod] = useState("");
// //   const [onlineOption, setOnlineOption] = useState("");
// //   const [orderPlaced, setOrderPlaced] = useState(false);
// //   const [orderId, setOrderId] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// // const [couponId, setCouponId] = useState(null); 

// //   // Subtotals
// //   const subtotal = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );
// //   const shipping = 49;
// //   const tax = subtotal * 0.1; // 10% tax
// //   const total = subtotal + shipping + tax - discount;

  

// //   // 🔹 CHANGED: Handle coupon validation via backend
// // const applyCoupon = async () => {
// //   if (!coupon) {
// //     alert("Enter a coupon code!");
// //     return;
// //   }

// //   try {
// //     const res = await axios.post("http://localhost:5000/api/coupons/validate", {
// //       code: coupon,
// //       total: subtotal
// //     });

// //     if (res.data.valid) {
// //       setDiscount(res.data.discountAmount);
// //        setCouponId(res.data.couponId);
// //       alert(res.data.message);
// //     } else {
// //       setDiscount(0);
// //       alert("Invalid coupon code!");
// //     }
// //   } catch (err) {
// //     console.error("Coupon error:", err.response?.data || err.message);
// //     setDiscount(0);
// //     alert("Error applying coupon");
// //   }
// // };

// // const navigate = useNavigate();

// //   // Handle order placement - Updated to match cart controller pattern
// //   const handlePlaceOrder = async () => {
// //     if (
// //       !formData.phone ||
// //       !formData.address ||
// //       !paymentMethod
// //     ) {
// //       alert("⚠️ Please fill all required fields & select payment.");
// //       return;
// //     }
// //  // 🔹 CHANGED: Block invalid phone number
// //     if (!isValidPhone(formData.phone)) {
// //       alert("⚠️ Please enter a valid 10-digit phone number.");
// //       return;
// //     }
// //     // Debug: Check what's in localStorage
// //     console.log("🔍 All localStorage items:");
// //     for (let i = 0; i < localStorage.length; i++) {
// //       const key = localStorage.key(i);
// //       console.log(`${key}: ${localStorage.getItem(key)}`);
// //     }

// //     // Always get the current user's UID (prioritize user object over stored uid)
// //     let uid;
// //     try {
// //       const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
// //       if (currentUser.UID) {
// //         uid = currentUser.UID;
// //         // Update stored UID to match current user
// //         localStorage.setItem("uid", uid.toString());
// //         console.log("Using current user UID:", uid);
// //       } else {
// //         // Fallback to stored UID if no user object
// //         uid = localStorage.getItem("uid") || localStorage.getItem("userId");
// //         console.log("Using fallback UID:", uid);
// //       }
// //     } catch (e) {
// //       console.error("Failed to parse user object:", e);
// //       uid = localStorage.getItem("uid") || localStorage.getItem("userId");
// //     }
    
// //     console.log("Final UID for order:", uid);
    
// //     console.log("🔍 Final UID found:", uid);
    
// //     if (!uid) {
// //       alert("⚠️ Please log in to place an order. No UID found in storage.");
// //       console.error("Available localStorage keys:", Object.keys(localStorage));
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {

// //       const orderPayload = {
// //   uid: parseInt(uid),
// //   TotalPrice: total,
// //   PaymentMethod: paymentMethod,
// //   // ShippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}`,
// //   ShippingAddress: formData.address,

// //   CouponCode: coupon || null, // 🔹 CHANGED
// //   couponId: couponId || null,         // 🔹 NEW
// //   discountAmount: discount || 0,  
// //   phone: formData.phone,
// //   items: cartItems.map((item) => ({
// //     productId: item.pid || item.productId,
// //     variantId: item.variantId,
// //     quantity: item.quantity,
// //     price: item.price,
// //   })),
// // };


// //       console.log("🛒 Placing order with payload:", orderPayload);

// //       const res = await axios.post(
// //         "http://localhost:5000/api/orders",
// //         orderPayload
// //       );

// //       if (res.data && res.data.orderId) {
// //         setOrderId(res.data.orderNumber || res.data.orderId);
// //         setOrderPlaced(true);
        
// //         // TODO: Add cart clearing after fixing the DELETE route
// //         console.log("✅ Order placed successfully!", res.data);
// //         navigate(`/order/${res.data.orderId}`);
// //       } else {
// //         alert("❌ Order failed to save!");
// //       }
// //     } catch (err) {
// //       console.error("Order placement error:", err.response?.data || err.message);
// //       alert("⚠️ Could not place order. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Show success page after order is placed
// //   if (orderPlaced) {
// //     return (
// //       <div className="order-success">
// //         <h2>✅ Order Confirmed!</h2>
// //         <p>
// //           Your order ID is <b>{orderId}</b>
// //         </p>
// //         <p>A receipt has been sent to your email.</p>
// //         <button 
// //           onClick={() => window.location.href = '/'}
// //           className="continue-shopping-btn"
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="checkout-wrapper">
// //       {/* LEFT SECTION */}
// //       <div className="checkout-left">
// //         {/* Cart Items */}
// //         <div className="cart-items-box">
// //           <h3>Your Items</h3>
// //           {cartItems.length === 0 ? (
// //             <p>No items in cart.</p>
// //           ) : (
// //             cartItems.map((item) => (
// //               <div key={item.variantId} className="checkout-item">
// //                 <img
// //                   src={
// //                     item.image
// //                       ? `/images/${item.image.replace(/^\/?images\//, "")}`
// //                       : "/images/default-product.jpg"
// //                   }
// //                   alt={item.name}
// //                 />
// //                 <div className="checkout-item-details">
// //                   <h4>{item.name}</h4>
// //                   <p>Size: {item.size}</p>
// //                   <p>Color: {item.color}</p>
// //                   <div className="quantity-control">
// //                     <button onClick={() => decreaseQuantity(item.variantId)}>
// //                       -
// //                     </button>
// //                     <span>{item.quantity}</span>
// //                     <button onClick={() => increaseQuantity(item.variantId)}>
// //                       +
// //                     </button>
// //                   </div>
// //                   <p className="price">₹{item.price * item.quantity}</p>
// //                   <button
// //                     className="remove-btn"
// //                     onClick={() => removeFromCart(item.variantId)}
// //                   >Remove Item
// //                   </button>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* Customer Info */}
// //         <div className="customer-info-box">
// //           <h3>Customer Information</h3>
// //           {/* <form>
// //             {Object.keys(formData).map((field) => (
// //               <input
// //                 key={field}
// //                 type="text"
// //                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
// //                 value={formData[field]}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, [field]: e.target.value })
// //                 }
// //               />
// //             ))}
// //           </form> */}

// //                     <form>
// //             {/* 🔹 CHANGED: Phone field with validation */}
// //             <input
// //               type="text"
// //               placeholder="Phone"
// //               value={formData.phone}
// //               onChange={(e) => {
// //                 const value = e.target.value.replace(/\D/g, ""); // only digits
// //                 setFormData({ ...formData, phone: value });
// //               }}
// //               maxLength={10}
// //             />
// //             {formData.phone && !isValidPhone(formData.phone) && (
// //               <p style={{ color: "red", fontSize: "0.85rem" }}>
// //                 ⚠ Phone number must be exactly 10 digits.
// //               </p>
// //             )}

// //             {/* Address field remains unchanged */}
// //             <input
// //               type="text"
// //               placeholder="Address"
// //               value={formData.address}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, address: e.target.value })
// //               }
// //             />
// //           </form>

// //         </div>

// //         {/* Payment Options */}
// //         <div className="payment-box">
// //           <h3>Payment Method</h3>
// //           <label>
// //             <input
// //               type="radio"
// //               name="payment"
// //               value="COD"
// //               checked={paymentMethod === "COD"}
// //               onChange={(e) => setPaymentMethod(e.target.value)}
// //             />
// //             Cash on Delivery
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               name="payment"
// //               value="Online"
// //               checked={paymentMethod === "Online"}
// //               onChange={(e) => setPaymentMethod(e.target.value)}
// //             />
// //             Online Payment
// //           </label>

// //           {paymentMethod === "Online" && (
// //             <div className="online-options">
// //               <label>
// //                 <input
// //                   type="radio"
// //                   name="online"
// //                   value="Card"
// //                   checked={onlineOption === "Card"}
// //                   onChange={(e) => setOnlineOption(e.target.value)}
// //                 />
// //                 Credit/Debit Card
// //               </label>
// //               <label>
// //                 <input
// //                   type="radio"
// //                   name="online"
// //                   value="PayPal"
// //                   checked={onlineOption === "PayPal"}
// //                   onChange={(e) => setOnlineOption(e.target.value)}
// //                 />
// //                 PayPal
// //               </label>
// //               <label>
// //                 <input
// //                   type="radio"
// //                   name="online"
// //                   value="Wallet"
// //                   checked={onlineOption === "Wallet"}
// //                   onChange={(e) => setOnlineOption(e.target.value)}
// //                 />
// //                 Digital Wallet
// //               </label>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* RIGHT SECTION - Order Summary */}
// //       <div className="checkout-right">
// //         <div className="order-summary-box">
// //           <h3>Order Summary</h3>
// //           <p>
// //             Subtotal: <b>₹{subtotal.toFixed(2)}</b>
// //           </p>
// //           <p>
// //             Shipping: <b>₹{shipping}</b>
// //           </p>
// //           <p>
// //             Tax (10%): <b>₹{tax.toFixed(2)}</b>
// //           </p>
// //           <p>
// //             Discount: <b>-₹{discount.toFixed(2)}</b>
// //           </p>

// //           {/* Coupon Section */}
// //           <div className="coupon-section">
// //             <input
// //               type="text"
// //               placeholder="Enter Coupon"
// //               value={coupon}
// //               onChange={(e) => setCoupon(e.target.value)}
// //             />
// //             <button type="button" onClick={applyCoupon}>
// //               Apply
// //             </button>
// //           </div>

// //           <h2>Total: ₹{total.toFixed(2)}</h2>
// //           <button 
// //             className="place-order-btn" 
// //             onClick={handlePlaceOrder}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? "Placing Order..." : "Place Order"}
// //           </button>

// //           <p className="secure-text">🔒 Your payment is secure and encrypted</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;


// import React, { useContext, useState } from "react";
// import { CartContext } from "./CartContext";
// import "./CheckoutPage.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
//     useContext(CartContext);

//   // State for form
//   const [formData, setFormData] = useState({
//     phone: "",
//     address: ""
//   });

//   const isValidPhone = (phone) => /^\d{10}$/.test(phone); // 🔹 phone validation

//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [onlineOption, setOnlineOption] = useState(""); // 🔹 Online payment option
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [orderId, setOrderId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [couponId, setCouponId] = useState(null);

//   // Subtotals
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const shipping = 49;
//   const tax = subtotal * 0.1; // 10% tax
//   const total = subtotal + shipping + tax - discount;

//   // 🔹 Handle coupon validation via backend
//   const applyCoupon = async () => {
//     if (!coupon) {
//       alert("Enter a coupon code!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/coupons/validate",
//         { code: coupon, total: subtotal }
//       );

//       if (res.data.valid) {
//         setDiscount(res.data.discountAmount);
//         setCouponId(res.data.couponId);
//         alert(res.data.message);
//       } else {
//         setDiscount(0);
//         alert("Invalid coupon code!");
//       }
//     } catch (err) {
//       console.error("Coupon error:", err.response?.data || err.message);
//       setDiscount(0);
//       alert("Error applying coupon");
//     }
//   };

//   const navigate = useNavigate();

//   // Handle order placement
//   const handlePlaceOrder = async () => {
//     if (!formData.phone || !formData.address || !paymentMethod) {
//       alert("⚠️ Please fill all required fields & select payment.");
//       return;
//     }

//     if (!isValidPhone(formData.phone)) {
//       alert("⚠️ Please enter a valid 10-digit phone number.");
//       return;
//     }

//     let uid;
//     try {
//       const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//       if (currentUser.UID) {
//         uid = currentUser.UID;
//         localStorage.setItem("uid", uid.toString());
//       } else {
//         uid = localStorage.getItem("uid") || localStorage.getItem("userId");
//       }
//     } catch (e) {
//       uid = localStorage.getItem("uid") || localStorage.getItem("userId");
//     }

//     if (!uid) {
//       alert("⚠️ Please log in to place an order. No UID found in storage.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // 🔹 Decide final payment method
//       let finalPaymentMethod = paymentMethod;
//       if (paymentMethod === "Online") {
//         if (!onlineOption) {
//           alert("⚠️ Please select an online payment option.");
//           setIsLoading(false);
//           return;
//         }
//         finalPaymentMethod = onlineOption; // Card / PayPal / Wallet
//       }

//       const orderPayload = {
//         uid: parseInt(uid),
//         TotalPrice: total,
//         PaymentMethod: finalPaymentMethod, // 🔹 updated
//         ShippingAddress: formData.address,
//         CouponCode: coupon || null,
//         couponId: couponId || null,
//         discountAmount: discount || 0,
//         phone: formData.phone,
//         items: cartItems.map((item) => ({
//           productId: item.pid || item.productId,
//           variantId: item.variantId,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//       };

//       const res = await axios.post(
//         "http://localhost:5000/api/orders",
//         orderPayload
//       );

//       if (res.data && res.data.orderId) {
//         setOrderId(res.data.orderNumber || res.data.orderId);
//         setOrderPlaced(true);
//         navigate(`/order/${res.data.orderId}`);
//       } else {
//         alert("❌ Order failed to save!");
//       }
//     } catch (err) {
//       console.error("Order placement error:", err.response?.data || err.message);
//       alert("⚠️ Could not place order. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Show success page after order is placed
//   if (orderPlaced) {
//     return (
//       <div className="order-success">
//         <h2>✅ Order Confirmed!</h2>
//         <p>Your order ID is <b>{orderId}</b></p>
//         <p>A receipt has been sent to your email.</p>
//         <button onClick={() => window.location.href = '/'} className="continue-shopping-btn">
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-wrapper">
//       <div className="checkout-left">
//         {/* Cart Items */}
//         <div className="cart-items-box">
//           <h3>Your Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items in cart.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.variantId} className="checkout-item">
//                 <img
//                   src={item.image ? `/images/${item.image.replace(/^\/?images\//, "")}` : "/images/default-product.jpg"}
//                   alt={item.name}
//                 />
//                 <div className="checkout-item-details">
//                   <h4>{item.name}</h4>
//                   <p>Size: {item.size}</p>
//                   <p>Color: {item.color}</p>
//                   <div className="quantity-control">
//                     <button onClick={() => decreaseQuantity(item.variantId)}>-</button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => increaseQuantity(item.variantId)}>+</button>
//                   </div>
//                   <p className="price">₹{item.price * item.quantity}</p>
//                   <button className="remove-btn" onClick={() => removeFromCart(item.variantId)}>
//                     Remove Item
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Customer Info */}
//         <div className="customer-info-box">
//           <h3>Customer Information</h3>
//           <form>
//             <input
//               type="text"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 setFormData({ ...formData, phone: value });
//               }}
//               maxLength={10}
//             />
//             {formData.phone && !isValidPhone(formData.phone) && (
//               <p style={{ color: "red", fontSize: "0.85rem" }}>
//                 ⚠ Phone number must be exactly 10 digits.
//               </p>
//             )}
//             <input
//               type="text"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//             />
//           </form>
//         </div>

//         {/* Payment Options */}
//         <div className="payment-box">
//           <h3>Payment Method</h3>
//           <label>
//             <input
//               type="radio"
//               name="payment"
//               value="COD"
//               checked={paymentMethod === "COD"}
//               onChange={(e) => {
//                 setPaymentMethod(e.target.value);
//                 setOnlineOption(""); // 🔹 CLEAR online option when COD is selected
//               }}
//             />
//             Cash on Delivery
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="payment"
//               value="Online"
//               checked={paymentMethod === "Online"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             Online Payment
//           </label>

//           {paymentMethod === "Online" && (
//             <div className="online-options">
//               <label>
//                 <input
//                   type="radio"
//                   name="online"
//                   value="Card"
//                   checked={onlineOption === "Card"}
//                   onChange={(e) => setOnlineOption(e.target.value)}
//                 />
//                 Credit/Debit Card
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="online"
//                   value="PayPal"
//                   checked={onlineOption === "PayPal"}
//                   onChange={(e) => setOnlineOption(e.target.value)}
//                 />
//                 PayPal
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="online"
//                   value="Wallet"
//                   checked={onlineOption === "Wallet"}
//                   onChange={(e) => setOnlineOption(e.target.value)}
//                 />
//                 Digital Wallet
//               </label>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RIGHT SECTION - Order Summary */}
//       <div className="checkout-right">
//         <div className="order-summary-box">
//           <h3>Order Summary</h3>
//           <p>Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
//           <p>Shipping: <b>₹{shipping}</b></p>
//           <p>Tax (10%): <b>₹{tax.toFixed(2)}</b></p>
//           <p>Discount: <b>-₹{discount.toFixed(2)}</b></p>

//           {/* Coupon Section */}
//           <div className="coupon-section">
//             <input
//               type="text"
//               placeholder="Enter Coupon"
//               value={coupon}
//               onChange={(e) => setCoupon(e.target.value)}
//             />
//             <button type="button" onClick={applyCoupon}>Apply</button>
//           </div>

//           <h2>Total: ₹{total.toFixed(2)}</h2>
//           <button
//             className="place-order-btn"
//             onClick={handlePlaceOrder}
//             disabled={isLoading}
//           >
//             {isLoading ? "Placing Order..." : "Place Order"}
//           </button>

//           <p className="secure-text">🔒 Your payment is secure and encrypted</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


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
                <img src={item.image ? `/images/${item.image.replace(/^\/?images\//, "")}` : "/images/default-product.jpg"} alt={item.name} />
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
