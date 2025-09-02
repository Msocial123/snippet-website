// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./OrderDetailsPage.css";

// const OrderDetailsPage = () => {
//   const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch order details
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/orders/order/${orderId}`);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Error fetching order details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   // Delete item from order
//   const handleDelete = async (itemId) => {
//     try {
//       const res = await axios.delete(`http://localhost:5000/api/orders/item/${itemId}`);

//       // Update the order state with new totals
//       const updatedOrder = {
//         ...order,
//         items: order.items.filter(item => item.item_id !== itemId),
//         TotalPrice: res.data.newTotal,
//         DiscountAmount: res.data.discountAmount
//       };

//       setOrder(updatedOrder);
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   // Validation helpers
//   const isValidEmail = (email) => email && email.includes("@");
//   const isValidPhone = (phone) => /^\d{10}$/.test(phone);
//   const isValidZip = (zip) => /^\d{5,6}$/.test(zip);

//   if (loading) return <p>Loading order details...</p>;
//   if (!order) return <p>Order not found</p>;

//   return (
//     <div className="order-details-wrapper">
//       <h1 className="success-message">Order Details</h1>

//       {/* User Information */}
//       {/* <div className="user-info">
//         <h3>User Information</h3>
//         <p>Name: <b>{order.user?.name || "N/A"}</b></p>
//         <p>Email: <b style={{color: isValidEmail(order.user?.email) ? "black" : "red"}}>
//           {order.user?.email || "N/A"}
//         </b></p>
//         <p>Phone: <b style={{color: isValidPhone(order.user?.phone) ? "black" : "red"}}>
//           {order.user?.phone || "N/A"}
//         </b></p>
//         <p>ZIP: <b style={{color: isValidZip(order.user?.zip) ? "black" : "red"}}>
//           {order.user?.zip || "N/A"}
//         </b></p>
//       </div> */}

//       {/* Order Summary */}
//       <div className="order-summary">
//         <h3>Order Summary</h3>
//         <p>Status: <b>{order.Status}</b></p>
//         <p>Total: <b>₹{order.TotalPrice}</b></p>
//         <p>Payment: <b>{order.PaymentMethod}</b> ({order.PaymentStatus})</p>
//         <p>Shipping Address: {order.ShippingAddress}</p>
//         {order.CouponCode && (
//           <p>Coupon: {order.CouponCode} (Discount: ₹{order.DiscountAmount})</p>
//         )}
//       </div>

//       {/* Order Items */}
//       <h3>Items:</h3>
//       <div className="order-items">
//         {order.items.map((item, idx) => (
//           <div key={idx} className="order-item">
//             <img
//               src={item.image ? `/images/${item.image.replace(/^\/?images\//, "")}` : "/images/default-product.jpg"}
//               alt={item.product_name}
//             />
//             <div className="order-item-details">
//               <h4>{item.product_name}</h4>
//               <p>Size: {item.size || "N/A"}</p>
//               <p>Color: {item.color || "N/A"}</p>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ₹{item.price}</p>

//               <button
//                 onClick={() => handleDelete(item.item_id)}
//                 className="delete-btn"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderDetailsPage.css";
// import PaymentButton from "./PaymentButton";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/order/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Delete item from order
  const handleDelete = async (itemId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/orders/item/${itemId}`);

      // Update the order state with new totals
      const updatedOrder = {
        ...order,
        items: order.items.filter(item => item.item_id !== itemId),
        TotalPrice: res.data.newTotal,
        DiscountAmount: res.data.discountAmount
      };

      setOrder(updatedOrder);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // const handlePayment = (selectedMethod) => {
  //   if (order.PaymentMethod === "COD" && selectedMethod !== "COD") {
  //     const confirmChange = window.confirm(
  //       `You originally selected COD. Do you want to change payment method to ${selectedMethod}?`
  //     );

  //     if (!confirmChange) {
  //       return; // ❌ Stop if user cancels
  //     }
  //   }

  //   // ✅ Proceed with saving payment
  //   savePayment(selectedMethod);
  // };

  const handlePayment = (selectedMethod) => {
  if (order.PaymentMethod === "COD" && selectedMethod !== "COD") {
    const confirmChange = window.confirm(
      `You originally selected COD. Do you want to change payment method to ${selectedMethod}?`
    );
    if (!confirmChange) return; // stop if user cancels
  }

  // Save payment in backend
  axios.put(`http://localhost:5000/api/payments/${order.OrderID}`, {
    paymentMethod: selectedMethod,
    paymentStatus: "Pending", // mark as pending until actual payment is done
    transactionId: "TXN" + Date.now(),
  })
  .then((res) => {
    // update local state
    setOrder({ ...order, PaymentMethod: selectedMethod, PaymentStatus: "Pending" });

    // ✅ Redirect to PaymentPage.js
    navigate(`/payment/${order.OrderID}`);
  })
  .catch((err) => {
    console.error(err);
    alert("Payment initiation failed!");
  });
};


  // const savePayment = (method) => {
  //   axios.post("http://localhost:5000/api/payments", {
  //     orderId: order.OrderID,
  //     paymentMethod: method,
  //     paymentStatus: "Completed",
  //   })
  //   .then((res) => {
  //     alert("Payment successful!");
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     alert("Payment failed!");
  //   });
  // };

  const savePayment = (method) => {
  axios.put(`http://localhost:5000/api/payments/${order.OrderID}`, {
    paymentMethod: method,
    paymentStatus: "Completed",
    transactionId: "TXN" + Date.now(), // generate fake txn ID for now
  })
  .then((res) => {
    alert("Payment successful!");
    setOrder({ ...order, PaymentMethod: method, PaymentStatus: "Completed" }); // update state
  })
  .catch((err) => {
    console.error(err);
    alert("Payment failed!");
  });
};

  // const goToPayment = () => {
  //   navigate(`/payment/${order.OrderID}`);
  // };

  // Validation helpers
  const isValidEmail = (email) => email && email.includes("@");
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidAddress = (address) => address && address.length > 10;

   const goToPayment = () => {
    navigate(`/payment/${order.OrderID}`);
  };

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="order-details-wrapper">
      <h1 className="success-message">Order Details</h1>

      {/* User Information */}
      <div className="user-info">
        <h3>User Information</h3>
        <p>
          Name: <b>
            {order.FirstName || order.LastName 
              ? `${order.FirstName || ""} ${order.LastName || ""}`.trim() 
              : "N/A"
            }
          </b>
        </p>
        <p>
          Email: <b style={{color: isValidEmail(order.Email) ? "black" : "red"}}>
            {order.Email || "N/A"}
          </b>
        </p>
        <p>
          Phone: <b style={{color: isValidPhone(order.Contact) ? "black" : "red"}}>
            {order.Contact || "N/A"}
          </b>
        </p>
        <p>
          Address: <b style={{color: isValidAddress(order.Address) ? "black" : "red"}}>
            {order.Address || "N/A"}
          </b>
        </p>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Order ID: <b>ORD-{order.OrderID}</b></p>
        <p>Status: <b>{order.Status}</b></p>
        <p>Order Date: <b>{new Date(order.OrderDate).toLocaleDateString()}</b></p>
        <p>Total: <b>₹{order.TotalPrice}</b></p>
        <p>Payment: <b>{order.PaymentMethod}</b> ({order.PaymentStatus})</p>
        <p>Shipping Address: <b>{order.ShippingAddress}</b></p>
        {order.CouponCode && (
          <p>Coupon Applied: <b>{order.CouponCode}</b> (Discount: ₹{order.DiscountAmount})</p>
        )}
        {order.TransactionID && (
          <p>Transaction ID: <b>{order.TransactionID}</b></p>
        )}
      </div>

      {/* Order Items */}
      <h3>Items Ordered:</h3>
      <div className="order-items">
        {order.items && order.items.length > 0 ? (
          order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <img
                src={item.image ? `/images/${item.image.replace(/^\/?images\//, "")}` : "/images/default-product.jpg"}
                alt={item.product_name}
                onError={(e) => {
                  e.target.src = "/images/default-product.jpg";
                }}
              />
              <div className="order-item-details">
                <h4>{item.product_name || "Product Name N/A"}</h4>
                <p>Size: <b>{item.size || "N/A"}</b></p>
                <p>Color: <b>{item.color || "N/A"}</b></p>
                <p>Quantity: <b>{item.quantity}</b></p>
                <p>Price per item: <b>₹{item.price}</b></p>
                <p>Total: <b>₹{(item.quantity * item.price).toFixed(2)}</b></p>

                <button
                  onClick={() => handleDelete(item.item_id)}
                  className="delete-btn"
                  title="Remove this item from order"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found in this order.</p>
        )}
      </div>

      {/* Order Total Summary */}
      {order.items && order.items.length > 0 && (
        <div className="order-total-summary">
          <h3>Order Total</h3>
          <p>
            Subtotal: <b>₹{
              order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)
            }</b>
          </p>
          {order.DiscountAmount > 0 && (
            <p style={{color: "green"}}>
              Discount: <b>-₹{order.DiscountAmount}</b>
            </p>
          )}
          <p className="final-total">
            Final Total: <b>₹{order.TotalPrice}</b>
          </p>
        </div>
      )}
      {/* <div style={{ marginTop: "20px" }}>
        <button onClick={goToPayment} className="pay-btn">
          Proceed to Payment
        </button>
      </div> */}
      {order.PaymentStatus !== "Completed" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select Payment Method</h3>
          <button onClick={() => handlePayment("COD")} className="pay-btn">Continue Payment</button>
          {/* <button onClick={() => handlePayment("UPI")} className="pay-btn">Pay with UPI</button>
          <button onClick={() => handlePayment("NetBanking")} className="pay-btn">Net Banking</button>
          <button onClick={() => handlePayment("Card")} className="pay-btn">Credit/Debit Card</button> */}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;