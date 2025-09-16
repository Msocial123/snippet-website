
// import React, { useContext, useState, useEffect } from "react";
// import { CartContext } from "./CartContext";
// import "./CheckoutPage.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [orderId, setOrderId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [couponId, setCouponId] = useState(null);

//   const navigate = useNavigate();

//   // Get user ID
//   let uid = null;
//   try {
//     const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//     uid = currentUser.UID || localStorage.getItem("uid") || localStorage.getItem("userId");
//   } catch {
//     uid = localStorage.getItem("uid") || localStorage.getItem("userId");
//   }

//   // Fetch addresses on mount
//   useEffect(() => {
//     if (uid) fetchAddresses();
//     // eslint-disable-next-line
//   }, [uid]);

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/addresses/user/${uid}`);
//       setAddresses(res.data);
//       if (res.data.length > 0) {
//         setSelectedAddress(res.data[0]);
//       }
//     } catch (err) {
//       setAddresses([]);
//     }
//   };

//   const handleSelect = (addr) => {
//     setSelectedAddress(addr);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAddAddress = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
//       alert("Please fill all fields.");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:5000/api/addresses/user/${uid}`, form);
//       setForm({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
//       setShowAddForm(false);
//       fetchAddresses();
//     } catch (err) {
//       alert("Failed to add address.");
//     }
//   };

//   const getImagePath = (image) => {
//     if (!image) return "http://localhost:5000/uploads/default-product.jpg";
//     const cleanName = image.replace(/^\/?(uploads|images)\//, "");
//     return `http://localhost:5000/uploads/${cleanName}`;
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = 49;
//   const tax = subtotal * 0.1;
//   const total = subtotal + shipping + tax - discount;

//   const applyCoupon = async () => {
//     if (!coupon) {
//       alert("Enter a coupon code!");
//       return;
//     }
//     try {
//       const res = await axios.post("http://localhost:5000/api/coupons/validate", {
//         code: coupon,
//         total: subtotal
//       });
//       if (res.data.valid) {
//         setDiscount(res.data.discountAmount);
//         setCouponId(res.data.couponId);
//         alert(res.data.message);
//       } else {
//         setDiscount(0);
//         alert("Invalid coupon code!");
//       }
//     } catch (err) {
//       setDiscount(0);
//       alert("Error applying coupon");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select a delivery address.");
//       return;
//     }
//     if (!uid) {
//       alert("⚠️ Please log in to place an order.");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       // Place the order using the selected address
//       const orderPayload = {
//         uid: parseInt(uid),
//         TotalPrice: total,
//         PaymentMethod: "COD",
//         ShippingAddress: `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
//         CouponCode: coupon || null,
//         couponId: couponId || null,
//         discountAmount: discount || 0,
//         phone: selectedAddress.phone,
//         items: cartItems.map((item) => ({
//           productId: item.pid || item.productId,
//           variantId: item.variantId,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//       };

//       const res = await axios.post("http://localhost:5000/api/orders", orderPayload);

//       if (res.data && res.data.orderId) {
//         setOrderId(res.data.orderId);
//         setOrderPlaced(true);
//         navigate(`/order/${res.data.orderId}`);
//       } else {
//         alert("❌ Order failed!");
//       }
//     } catch (err) {
//       alert("⚠️ Could not place order.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//         {/* Address Selection */}
//         <div className="address-section">
//           <h3>Select Delivery Address</h3>
//           {addresses.length === 0 && <p>No addresses found. Please add one.</p>}
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {addresses.map(addr => (
//               <li
//                 key={addr.AddressID}
//                 style={{
//                   border: selectedAddress && selectedAddress.AddressID === addr.AddressID ? "2px solid #ffa726" : "1px solid #eee",
//                   borderRadius: 8,
//                   padding: 16,
//                   marginBottom: 12,
//                   background: "#fafbfc",
//                   cursor: "pointer"
//                 }}
//                 onClick={() => handleSelect(addr)}
//               >
//                 <input
//                   type="radio"
//                   checked={selectedAddress && selectedAddress.AddressID === addr.AddressID}
//                   onChange={() => handleSelect(addr)}
//                   style={{ marginRight: 8 }}
//                 />
//                 <strong>{addr.Name}</strong> ({addr.Phone})<br />
//                 {addr.Address}, {addr.City}, {addr.State} - {addr.Pincode}
//               </li>
//             ))}
//           </ul>
//           <button onClick={() => setShowAddForm(!showAddForm)} className="edit-btn" type="button">
//             {showAddForm ? "Cancel" : "Add New Address"}
//           </button>
//           {showAddForm && (
//             <form className="address-form" onSubmit={handleAddAddress} style={{ marginTop: 16 }}>
//               <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
//               <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
//               <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
//               <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
//               <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
//               <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
//               <button type="submit" className="edit-btn">Save Address</button>
//             </form>
//           )}
//         </div>

//         {/* Cart Items */}
//         <div className="cart-items-box">
//           <h3>Your Items</h3>
//           {cartItems.length === 0 ? (
//             <p>No items in cart.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item.variantId} className="checkout-item">
//                 <img
//                   src={getImagePath(item.image)}
//                   alt={item.name}
//                   onError={(e) => {
//                     e.target.src = "http://localhost:5000/uploads/default-product.jpg";
//                   }}
//                 />
//                 <div className="checkout-item-details">
//                   <h4>{item.name}</h4>
//                   <p>Size: {item.size}</p>
//                   <p>Color: {item.color}</p>
//                   <div className="quantity-control">
//                     <button id="decrease" onClick={() => decreaseQuantity(item.variantId)}>-</button>
//                     <span>{item.quantity}</span>
//                     <button id="increase" onClick={() => increaseQuantity(item.variantId)}>+</button>
//                   </div>
//                   <p className="price">₹{item.price * item.quantity}</p>
//                   <button className="remove-btn" onClick={() => removeFromCart(item.variantId)}>Remove Item</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="checkout-right">
//         <div className="order-summary-box">
//           <h3>Order Summary</h3>
//           <p>Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
//           <p>Shipping: <b>₹{shipping}</b></p>
//           <p>Tax (10%): <b>₹{tax.toFixed(2)}</b></p>
//           <p>Discount: <b>-₹{discount.toFixed(2)}</b></p>

//           {/* Coupon Section */}
//           <div className="coupon-section">
//             <input type="text" placeholder="Enter Coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
//             <button type="button" onClick={applyCoupon}>Apply</button>
//           </div>

//           <h2>Total: ₹{total.toFixed(2)}</h2>
//           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={isLoading}>
//             {isLoading ? "Placing Order..." : "Place Order"}
//           </button>

//           <p className="secure-text">🔒 Your payment will be completed on Order Details page</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import "./CheckoutPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [couponId, setCouponId] = useState(null);

  const navigate = useNavigate();

  // Optional: persist default address when user selects (true/false)
  const persistDefaultOnSelect = false;

  // Get user ID
  let uid = null;
  try {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    uid = currentUser.UID || localStorage.getItem("uid") || localStorage.getItem("userId");
  } catch {
    uid = localStorage.getItem("uid") || localStorage.getItem("userId");
  }

  useEffect(() => {
    if (uid) fetchAddresses();
    // eslint-disable-next-line
  }, [uid]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/addresses/user/${uid}`);
      const data = res.data || [];
      setAddresses(data);

      if (data.length > 0) {
        // prefer IsDefault, otherwise most recent
        const defaultAddr = data.find(a => a.IsDefault === 1) || data[data.length - 1] || data[0];
        setSelectedAddress(defaultAddr);
      } else {
        setSelectedAddress(null);
      }
    } catch (err) {
      setAddresses([]);
      setSelectedAddress(null);
    }
  };

  const handleSelect = async (addr) => {
    setSelectedAddress(addr);

    if (persistDefaultOnSelect) {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const uidVal = storedUser?.UID;
        if (uidVal) {
          await axios.put(`http://localhost:5000/api/addresses/default/${addr.AddressID}`, { uid: uidVal });
          // refresh list to reflect IsDefault
          fetchAddresses();
        }
      } catch (err) {
        console.warn("Could not persist default address", err);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/addresses/user/${uid}`, form);
      setForm({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
      setShowAddForm(false);
      fetchAddresses();
    } catch (err) {
      alert("Failed to add address.");
    }
  };

  const getImagePath = (image) => {
    if (!image) return "http://localhost:5000/uploads/default-product.jpg";
    const cleanName = image.replace(/^\/?(uploads|images)\//, "");
    return `http://localhost:5000/uploads/${cleanName}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 49;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = async () => {
    if (!coupon) {
      alert("Enter a coupon code!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/coupons/validate", { code: coupon, total: subtotal });
      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        setCouponId(res.data.couponId);
        alert(res.data.message);
      } else {
        setDiscount(0);
        alert("Invalid coupon code!");
      }
    } catch (err) {
      setDiscount(0);
      alert("Error applying coupon");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    if (!uid) {
      alert("⚠️ Please log in to place an order.");
      return;
    }
    setIsLoading(true);
    try {
      // robust shipping construction
      const addrLine = `${selectedAddress.Address || selectedAddress.address || ""}`.trim();
      const city = selectedAddress.City || selectedAddress.city || "";
      const state = selectedAddress.State || selectedAddress.state || "";
      const pincode = selectedAddress.Pincode || selectedAddress.pincode || "";
      const phone = selectedAddress.Phone || selectedAddress.phone || "";

      const ShippingAddress = `${addrLine}${city ? ", " + city : ""}${state ? ", " + state : ""}${pincode ? " - " + pincode : ""}`;

      const orderPayload = {
        uid: parseInt(uid, 10) || uid,
        TotalPrice: total,
        PaymentMethod: "COD",
        ShippingAddress,
        ShippingAddressId: selectedAddress.AddressID || selectedAddress.addressId || null,
        CouponCode: coupon || null,
        couponId: couponId || null,
        discountAmount: discount || 0,
        phone,
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
        navigate(`/order/${res.data.orderId}`);
      } else {
        alert("❌ Order failed!");
      }
    } catch (err) {
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
        <div className="address-section">
          <h3>Select Delivery Address</h3>
          {addresses.length === 0 && <p>No addresses found. Please add one.</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {addresses.map(addr => (
              <li
                key={addr.AddressID}
                style={{
                  border: selectedAddress && (selectedAddress.AddressID === addr.AddressID) ? "2px solid #ffa726" : "1px solid #eee",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 12,
                  background: "#fafbfc",
                  cursor: "pointer"
                }}
                onClick={() => handleSelect(addr)}
              >
                <input
                  type="radio"
                  checked={selectedAddress && selectedAddress.AddressID === addr.AddressID}
                  onChange={() => handleSelect(addr)}
                  style={{ marginRight: 8 }}
                />
                <strong>{addr.Name}</strong> ({addr.Phone})<br />
                {addr.Address}, {addr.City}, {addr.State} - {addr.Pincode}
                {addr.IsDefault ? <span style={{ marginLeft: 8, fontSize: 12, color: "#1976d2" }}>Default</span> : null}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowAddForm(!showAddForm)} className="edit-btn" type="button">
            {showAddForm ? "Cancel" : "Add New Address"}
          </button>
          {showAddForm && (
            <form className="address-form" onSubmit={handleAddAddress} style={{ marginTop: 16 }}>
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
              <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
              <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
              <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
              <button type="submit" className="edit-btn">Save Address</button>
            </form>
          )}
        </div>

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
                  onError={(e) => { e.target.src = "http://localhost:5000/uploads/default-product.jpg"; }}
                />
                <div className="checkout-item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <div className="quantity-control">
                    <button id="decrease" onClick={() => decreaseQuantity(item.variantId)}>-</button>
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
      </div>

      <div className="checkout-right">
        <div className="order-summary-box">
          <h3>Order Summary</h3>
          <p>Subtotal: <b>₹{subtotal.toFixed(2)}</b></p>
          <p>Shipping: <b>₹{shipping}</b></p>
          <p>Tax (10%): <b>₹{tax.toFixed(2)}</b></p>
          <p>Discount: <b>-₹{discount.toFixed(2)}</b></p>

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
