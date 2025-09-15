
import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewInputs, setReviewInputs] = useState({}); // { product_id: { rating, text } }

  const getImagePath = (image) => {
    if (!image) return "http://localhost:5000/uploads/default-product.jpg";
    return image.startsWith("uploads/")
      ? `http://localhost:5000/${image}`
      : `http://localhost:5000/uploads/${image}`;
  };

  const enrichOrderItems = async (ordersData) => {
    const variantIds = [
      ...new Set(
        ordersData.flatMap((order) =>
          order.items.map((item) => item.variant_id)
        )
      ),
    ];
    if (!variantIds.length) return ordersData;

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
  };

  // const cancelOrder = async (orderId) => {
  //   try {
  //     await axios.post(`http://localhost:5000/api/orders/cancel/${orderId}`);
  //     alert("Order cancelled successfully");
  //     setOrders((prev) =>
  //       prev.map((o) =>
  //         o.OrderID === orderId ? { ...o, Status: "Cancelled" } : o
  //       )
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to cancel order");
  //   }
  // };

  const cancelOrder = async (orderId) => {
  const reason = prompt("Please enter the reason for cancelling this order:");
  if (!reason || !reason.trim()) {
    alert("Cancellation reason is required.");
    return;
  }

  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  try {
    await axios.post(`http://localhost:5000/api/orders/cancel/${orderId}`, {
      reason
    });

    alert("Order cancelled successfully");
    // Remove it from UI
    setOrders((prev) => prev.filter((o) => o.OrderID !== orderId));
  } catch (err) {
    console.error("Cancel order error:", err);
    alert("Failed to cancel order");
  }
};


  const submitReview = async (productId, rating, reviewText, userId) => {
    try {
      if (!rating || rating < 1 || rating > 5) {
        alert("Please select a rating between 1 and 5");
        return;
      }
      if (!reviewText.trim()) {
        alert("Please enter your review");
        return;
      }

      await axios.post("http://localhost:5000/api/reviews/add-review", {
        userId,
        productId,
        rating,
        reviewText,
      });

      alert("Review submitted successfully");
      setReviewInputs((prev) => ({
        ...prev,
        [productId]: { rating: 0, text: "" },
      }));
    } catch (err) {
      console.error("Review submit failed", err);
      alert("Failed to submit review");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {

//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         const uid = storedUser?.UID;

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
        console.error("Failed to load orders:", err);
        alert("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="orders-loading">Loading your orders...</div>;
  if (!orders.length) return <div className="no-orders">You have no previous orders.</div>;

  return (
    <div className="orders-wrapper">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.OrderID} className="order-card">
          <div className="order-header">
            <h3>Order #{order.OrderID}</h3>
            <p><b>Date:</b> {new Date(order.OrderDate).toLocaleDateString()}</p>
            <p><b>Status:</b> {order.Status}</p>
            <p><b>Total:</b> ₹{order.FinalAmount || order.TotalPrice}</p>
            {["Pending", "Paid"].includes(order.Status) && (
              <button
                onClick={() => cancelOrder(order.OrderID)}
                className="cancel-button"
              >
                Cancel Order
              </button>
            )}
          </div>

          <div className="order-items">
            {order.items.map((item, idx) => (
              <div key={item.variant_id + "-" + idx} className="order-item">
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
                            star <= (reviewInputs[item.product_id]?.rating || 0)
                              ? "#facc15"
                              : "#d1d5db"
                          }
                          onClick={() =>
                            setReviewInputs((prev) => ({
                              ...prev,
                              [item.product_id]: {
                                ...(prev[item.product_id] || {}),
                                rating: star,
                              },
                            }))
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm">
                        {reviewInputs[item.product_id]?.rating
                          ? `${reviewInputs[item.product_id].rating} / 5`
                          : "No rating"}
                      </span>
                    </div>

                    <textarea
                      placeholder="Write your review"
                      value={reviewInputs[item.product_id]?.text || ""}
                      onChange={(e) =>
                        setReviewInputs((prev) => ({
                          ...prev,
                          [item.product_id]: {
                            ...(prev[item.product_id] || {}),
                            text: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        submitReview(
                          item.product_id,
                          reviewInputs[item.product_id]?.rating,
                          reviewInputs[item.product_id]?.text,
                          order.UserID
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
    </div>
  );
};

export default OrdersPage;