
// import React, { useEffect, useState } from "react";

// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import "./OrdersPage.css";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reviewInputs, setReviewInputs] = useState({}); // { product_id: { rating, text } }

//   const getImagePath = (image) => {
//     if (!image) return "http://localhost:5000/uploads/default-product.jpg";
//     return image.startsWith("uploads/")
//       ? `http://localhost:5000/${image}`
//       : `http://localhost:5000/uploads/${image}`;
//   };

//   const enrichOrderItems = async (ordersData) => {
//     const variantIds = [
//       ...new Set(
//         ordersData.flatMap((order) =>
//           order.items.map((item) => item.variant_id)
//         )
//       ),
//     ];
//     if (!variantIds.length) return ordersData;

//     const variantRes = await axios.post(
//       "http://localhost:5000/api/variants/bulk",
//       { variantIds }
//     );

//     const variantMap = {};
//     variantRes.data.forEach((v) => {
//       variantMap[v.VariantID] = v;
//     });

//     return ordersData.map((order) => ({
//       ...order,
//       items: order.items.map((item) => {
//         const variant = variantMap[item.variant_id] || {};
//         return {
//           ...item,
//           name: variant.Name || "Product",
//           image: variant.VariantImage,
//           color: variant.Color || "-",
//           size: variant.Size || "-",
//         };
//       }),
//     }));
//   };

//   const cancelOrder = async (orderId) => {
//   const reason = prompt("Please enter the reason for cancelling this order:");
//   if (!reason || !reason.trim()) {
//     alert("Cancellation reason is required.");
//     return;
//   }

//   if (!window.confirm("Are you sure you want to cancel this order?")) return;

//   try {
//     await axios.post(`http://localhost:5000/api/orders/cancel/${orderId}`, {
//       reason
//     });

//     alert("Order cancelled successfully");
//     // Remove it from UI
//     setOrders((prev) => prev.filter((o) => o.OrderID !== orderId));
//   } catch (err) {
//     console.error("Cancel order error:", err);
//     alert("Failed to cancel order");
//   }
// };

// const submitReview = async (productId, variantId, rating, reviewText, userId) => {
//   const uid = userId || JSON.parse(localStorage.getItem("user"))?.UID;

//   console.log({ userId: uid, productId, variantId, rating, reviewText });

//   if (!uid || !productId || !variantId || !rating || !reviewText) {
//     alert("All fields are required");
//     return;
//   }

//   try {
//     await axios.post("http://localhost:5000/api/reviews/add-review", {
//       userId: uid,
//       productId,
//       variantId,
//       rating,
//       reviewText,
//     });

//     alert("✅ Review submitted successfully!");
//     // ❌ Do not clear the reviewInputs so they stay visible
//   } catch (err) {
//     console.error("Review submit failed", err);
//     alert("❌ Failed to submit review");
//   }
// };


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {

// //         const storedUser = JSON.parse(localStorage.getItem("user"));
// //         const uid = storedUser?.UID;

//         const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//         const uid =
//           currentUser.UID ||
//           localStorage.getItem("uid") ||
//           localStorage.getItem("userId");

//         if (!uid) {
//           alert("Please log in to view your orders.");
//           setLoading(false);
//           return;
//         }
//         const res = await axios.get(
//           `http://localhost:5000/api/orders/user/${uid}`
//         );
//         let ordersData = res.data || [];
//         ordersData = await enrichOrderItems(ordersData);
//         setOrders(ordersData);
//       } catch (err) {
//         console.error("Failed to load orders:", err);
//         alert("Failed to load orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <div className="orders-loading">Loading your orders...</div>;
//   if (!orders.length) return <div className="no-orders">You have no previous orders.</div>;

//   return (
//     <div className="orders-wrapper">
//       <h2>Your Orders</h2>
//       {orders.map((order) => (
//         <div key={order.OrderID} className="order-card">
//           <div className="order-header">
//             <h3>Order #{order.OrderID}</h3>
//             <p><b>Date:</b> {new Date(order.OrderDate).toLocaleDateString()}</p>
//             <p><b>Status:</b> {order.Status}</p>
//             <p><b>Total:</b> ₹{order.FinalAmount || order.TotalPrice}</p>
//             {["Pending", "Paid"].includes(order.Status) && (
//               <button
//                 onClick={() => cancelOrder(order.OrderID)}
//                 className="cancel-button"
//               >
//                 Cancel Order
//               </button>
//             )}
//           </div>

//           <div className="order-items">
//             {order.items.map((item, idx) => (
//               <div key={item.variant_id + "-" + idx} className="order-item">
//                 <img
//                   src={getImagePath(item.image)}
//                   alt={item.name}
//                   onError={(e) =>
//                     (e.target.src =
//                       "http://localhost:5000/uploads/default-product.jpg")
//                   }
//                 />
//                 <div className="order-item-details">
//                   <h4>{item.name}</h4>
//                   <p>Size: {item.size}</p>
//                   <p>Color: {item.color}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p className="price">₹{item.price * item.quantity}</p>

//                   {/* ⭐ Review section */}
//                   <div className="review-section">
//                     <div className="flex items-center gap-1 mb-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FaStar
//                           key={star}
//                           size={24}
//                           className="cursor-pointer transition-colors"
//                           color={
//                             star <= (reviewInputs[item.variant_id]?.rating || 0)
//                               ? "#facc15"
//                               : "#d1d5db"
//                           }
//                           onClick={() =>
//                             setReviewInputs((prev) => ({
//                               ...prev,
//                               [item.variant_id]: {
//                                 ...(prev[item.variant_id] || {}),
//                                 rating: star,
//                               },
//                             }))
//                           }
//                         />
//                       ))}
//                       <span className="ml-2 text-sm">
//                         {reviewInputs[item.variant_id]?.rating
//                           ? `${reviewInputs[item.variant_id].rating} / 5`
//                           : "No rating"}
//                       </span>
//                     </div>

//                     <textarea
//                       placeholder="Write your review"
//                       value={reviewInputs[item.variant_id]?.text || ""}
//                       onChange={(e) =>
//                         setReviewInputs((prev) => ({
//                           ...prev,
//                           [item.variant_id]: {
//                             ...(prev[item.variant_id] || {}),
//                             text: e.target.value,
//                           },
//                         }))
//                       }
//                     />
//                     {/* <button
//                       onClick={() =>
//                         submitReview(
//                           item.product_id,
//                           reviewInputs[item.product_id]?.rating,
//                           reviewInputs[item.product_id]?.text,
//                           order.UserID
//                         )
//                       }
//                     >
//                       Submit Review
//                     </button> */}
//                     <button
//   onClick={() =>
//     submitReview(
//       item.product_id || item.PID,  // fallback
//       item.variant_id,
//       reviewInputs[item.variant_id]?.rating,
//       reviewInputs[item.variant_id]?.text,
//       order.UserID || JSON.parse(localStorage.getItem("user"))?.UID
//     )
//   }
// >
//   Submit Review
// </button>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewInputs, setReviewInputs] = useState({});
  const [trackingData, setTrackingData] = useState([]);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ Get product image path
  const getImagePath = (image) => {
    if (!image) return "http://localhost:5000/uploads/default-product.jpg";
    return image.startsWith("uploads/")
      ? `http://localhost:5000/${image}`
      : `http://localhost:5000/uploads/${image}`;
  };

  // ✅ Map order items with variant info
  const enrichOrderItems = async (ordersData) => {
    const variantIds = [
      ...new Set(
        ordersData.flatMap((order) =>
          order.items.map((item) => item.variant_id)
        )
      ),
    ];
    if (!variantIds.length) return ordersData;

    try {
      const variantRes = await axios.post(
        "http://localhost:5000/api/variants/bulk",
        { variantIds }
      );

      const variantMap = {};
      variantRes.data.forEach((v) => {
        variantMap[v.VariantID] = v;
      });

      return ordersData.map((order) => ({
        ...order,
        items: order.items.map((item) => {
          const variant = variantMap[item.variant_id] || {};
          return {
            ...item,
            name: variant.Name || "Product",
            image: variant.VariantImage,
            color: variant.Color || "-",
            size: variant.Size || "-",
          };
        }),
      }));
    } catch (err) {
      console.error("❌ Failed to enrich items:", err);
      return ordersData;
    }
  };

  // ✅ Cancel order
  const cancelOrder = async (orderId) => {
    const reason = prompt("Please enter the reason for cancelling this order:");
    if (!reason || !reason.trim()) {
      alert("Cancellation reason is required.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.post(`http://localhost:5000/api/orders/cancel/${orderId}`, {
        reason,
      });

      alert("Order cancelled successfully");
      setOrders((prev) => prev.filter((o) => o.OrderID !== orderId));
    } catch (err) {
      console.error("❌ Cancel order error:", err);
      alert("Failed to cancel order");
    }
  };

  // ✅ Submit review
  const submitReview = async (productId, variantId, rating, reviewText, userId) => {
    const uid = userId || JSON.parse(localStorage.getItem("user"))?.UID;

    if (!uid || !productId || !variantId || !rating || !reviewText) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews/add-review", {
        userId: uid,
        productId,
        variantId,
        rating,
        reviewText,
      });

      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error("❌ Review submit failed:", err);
      alert("❌ Failed to submit review");
    }
  };

  // ✅ Fetch tracking
  const fetchTracking = async (orderId) => {
    try {
      console.log("🔍 Fetching tracking for order:", orderId);
      const res = await axios.get(
        `http://localhost:5000/api/orders/${orderId}/tracking`
      );
      setTrackingData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("ℹ️ No tracking info available for:", orderId);
        setTrackingData([]);
      } else {
        console.error("❌ Tracking fetch failed:", err);
        alert("Failed to fetch tracking info");
      }
    } finally {
      setSelectedOrder(orderId);
      setShowTracking(true);
    }
  };

  // ✅ Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const uid =
          currentUser.UID ||
          localStorage.getItem("uid") ||
          localStorage.getItem("userId");

        if (!uid) {
          alert("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${uid}`
        );
        let ordersData = res.data || [];
        ordersData = await enrichOrderItems(ordersData);
        setOrders(ordersData);
      } catch (err) {
        console.error("❌ Failed to load orders:", err);
        alert("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ UI states
  if (loading)
    return <div className="orders-loading">Loading your orders...</div>;
  if (!orders.length)
    return <div className="no-orders">You have no previous orders.</div>;

  return (
    <div className="orders-wrapper">
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div key={order.OrderID} className="order-card">
          <div className="order-header">
            <h3>Order #{order.OrderID}</h3>
            <p>
              <b>Date:</b>{" "}
              {new Date(order.OrderDate).toLocaleDateString()}
            </p>
            <p>
              <b>Status:</b> {order.Status}
            </p>
            <p>
              <b>Total:</b> ₹{order.FinalAmount || order.TotalPrice}
            </p>
            <div className="order-actions">
              {["Pending", "Paid"].includes(order.Status) && (
                <button
                  onClick={() => cancelOrder(order.OrderID)}
                  className="cancel-button"
                >
                  Cancel Order
                </button>
              )}
              <button
                onClick={() => fetchTracking(order.OrderID)}
                className="track-button"
              >
                Track Order
              </button>
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item, idx) => (
              <div
                key={item.variant_id + "-" + idx}
                className="order-item"
              >
                <img
                  src={getImagePath(item.image)}
                  alt={item.name}
                  onError={(e) =>
                    (e.target.src =
                      "http://localhost:5000/uploads/default-product.jpg")
                  }
                />
                <div className="order-item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="price">₹{item.price * item.quantity}</p>

                  {/* ⭐ Review section */}
                  <div className="review-section">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={24}
                          className="cursor-pointer transition-colors"
                          color={
                            star <=
                            (reviewInputs[item.variant_id]?.rating || 0)
                              ? "#facc15"
                              : "#d1d5db"
                          }
                          onClick={() =>
                            setReviewInputs((prev) => ({
                              ...prev,
                              [item.variant_id]: {
                                ...(prev[item.variant_id] || {}),
                                rating: star,
                              },
                            }))
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm">
                        {reviewInputs[item.variant_id]?.rating
                          ? `${reviewInputs[item.variant_id].rating} / 5`
                          : "No rating"}
                      </span>
                    </div>

                    <textarea
                      placeholder="Write your review"
                      value={reviewInputs[item.variant_id]?.text || ""}
                      onChange={(e) =>
                        setReviewInputs((prev) => ({
                          ...prev,
                          [item.variant_id]: {
                            ...(prev[item.variant_id] || {}),
                            text: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        submitReview(
                          item.product_id || item.PID,
                          item.variant_id,
                          reviewInputs[item.variant_id]?.rating,
                          reviewInputs[item.variant_id]?.text,
                          order.UserID ||
                            JSON.parse(localStorage.getItem("user"))?.UID
                        )
                      }
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 🟡 Tracking Modal */}
      // ...existing code...
      <div className="order-tracking-container">
{showTracking && (
  <div className="tracking-modal" style={{ zIndex: 9999, display: "block", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)" }}>
    <div className="tracking-content" style={{ background: "#fff", margin: "10vh auto", padding: 20, borderRadius: 8, maxWidth: 400 }}>
      <h3>Order Tracking (Order #{selectedOrder})</h3>
      {trackingData.length ? (
        <ul>
          {trackingData.map((step, idx) => (
            <li key={idx}>
              <b>{step.Status}</b> - {step.StatusMessage} <br />
              {step.Location && <span>📍 {step.Location}</span>} <br />
              {step.UpdatedAt && (
                <small>{new Date(step.UpdatedAt).toLocaleString()}</small>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracking updates available.</p>
      )}
      <button onClick={() => setShowTracking(false)}>Close</button>
    </div>
  </div>
)}
</div>
// ...existing code...
    </div>
  );
};

export default OrdersPage;
