// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import "./OrdersPage.css";

// // // // // // const OrdersPage = () => {
// // // // // //   const [orders, setOrders] = useState([]); // Initialize as empty array
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     const fetchOrders = async () => {
// // // // // //       try {
// // // // // //         const uid = localStorage.getItem("uid");
// // // // // //         if (!uid) {
// // // // // //           setError("Please log in to view orders.");
// // // // // //           setLoading(false);
// // // // // //           return;
// // // // // //         }
// // // // // //         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
// // // // // //         if (Array.isArray(response.data)) {
// // // // // //           setOrders(response.data);
// // // // // //         } else {
// // // // // //           setOrders([]); // fallback if data is not array
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         setError("Failed to fetch your orders.");
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchOrders();
// // // // // //   }, []);

// // // // // //   if (loading) return <p>Loading your orders...</p>;
// // // // // //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// // // // // //   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

// // // // // //   return (
// // // // // //     <div className="orders-page">
// // // // // //       <h2>Your Orders</h2>
// // // // // //       <ul className="order-list">
// // // // // //         {orders.map((order) => {
// // // // // //           const firstProduct = (order.Items && order.Items.length > 0) ? order.Items[0] : null;

// // // // // //           return (
            
// // // // // //             <li key={order.OrderID} className="order-item">
// // // // // //               {/* Show first product image */}
// // // // // //               {firstProduct && (
// // // // // //                 <img
// // // // // //                   src={firstProduct.ImageUrl || "/placeholder.svg"}
// // // // // //                   alt={firstProduct.Title || "Product Image"}
// // // // // //                   className="order-product-img-main"
// // // // // //                   style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
// // // // // //                 />
// // // // // //               )}
// // // // // //               <div>
// // // // // //                 <strong>Order ID:</strong> #{order.OrderID}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <strong>Status:</strong> {order.Status}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <strong>Shipping Address:</strong> {order.Address || "N/A"}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}
// // // // // //               </div>
// // // // // //               <div>
// // // // // //                 <strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}
// // // // // //               </div>
// // // // // //               {order.CouponCodes && order.CouponCodes.length > 0 && (
// // // // // //                 <div>
// // // // // //                   <strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //               <div>
// // // // // //                 <strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}
// // // // // //               </div>
// // // // // //             </li>
// // // // // //           );
// // // // // //         })}
// // // // // //       </ul>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default OrdersPage;


// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // // import "./OrdersPage.css";

// // // // // const OrdersPage = () => {
// // // // //   const [orders, setOrders] = useState([]); // Initialize as empty array
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState("");

// // // // //   useEffect(() => {
// // // // //     const fetchOrders = async () => {
// // // // //       try {
// // // // //         const uid = localStorage.getItem("uid");
// // // // //         if (!uid) {
// // // // //           setError("Please log in to view orders.");
// // // // //           setLoading(false);
// // // // //           return;
// // // // //         }
// // // // //         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
// // // // //         if (Array.isArray(response.data)) {
// // // // //           setOrders(response.data);
// // // // //         } else {
// // // // //           setOrders([]); // fallback if data is not array
// // // // //         }
// // // // //       } catch (err) {
// // // // //         setError("Failed to fetch your orders.");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchOrders();
// // // // //   }, []);

// // // // //   if (loading) return <p>Loading your orders...</p>;
// // // // //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// // // // //   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

// // // // //   return (
// // // // //     <div className="orders-page">
// // // // //       <h2>Your Orders</h2>
// // // // //       <ul className="order-list">
// // // // //         {orders.map((order) => {
// // // // //           const firstProduct = (order.Items && order.Items.length > 0) ? order.Items[0] : null;
// // // // //           const imageSrc = firstProduct && firstProduct.ImageUrl
// // // // //             ? `/images/${firstProduct.ImageUrl.replace(/^\/?images\//, "")}`
// // // // //             : "/images/default-product.jpg";

// // // // //           return (
// // // // //             <li key={order.OrderID} className="order-item">
// // // // //               {/* Show first product image */}
// // // // //               {firstProduct && (
// // // // //                 <img
// // // // //                   src={imageSrc}
// // // // //                   alt={firstProduct.Title || "Product Image"}
// // // // //                   className="order-product-img-main"
// // // // //                   style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
// // // // //                 />
// // // // //               )}
// // // // //               <div>
// // // // //                 <strong>Order ID:</strong> #{order.OrderID}
// // // // //               </div>
// // // // //               <div>
// // // // //                 <strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}
// // // // //               </div>
// // // // //               <div>
// // // // //                 <strong>Status:</strong> {order.Status}
// // // // //               </div>
// // // // //               <div>
// // // // //                 <strong>Shipping Address:</strong> {order.Address || "N/A"}
// // // // //               </div>
// // // // //               <div>
// // // // //                 <strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}
// // // // //               </div>
// // // // //               <div>
// // // // //                 <strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}
// // // // //               </div>
// // // // //               {order.CouponCodes && order.CouponCodes.length > 0 && (
// // // // //                 <div>
// // // // //                   <strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}
// // // // //                 </div>
// // // // //               )}
// // // // //               <div>
// // // // //                 <strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}
// // // // //               </div>
// // // // //             </li>
// // // // //           );
// // // // //         })}
// // // // //       </ul>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OrdersPage;


// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // // import "./OrdersPage.css";

// // // // const OrdersPage = () => {
// // // //   const [orders, setOrders] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     const fetchOrders = async () => {
// // // //       try {
// // // //         const uid = localStorage.getItem("uid");
// // // //         if (!uid) {
// // // //           setError("Please log in to view orders.");
// // // //           setLoading(false);
// // // //           return;
// // // //         }
// // // //         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
// // // //         if (Array.isArray(response.data)) {
// // // //           setOrders(response.data);
// // // //         } else {
// // // //           setOrders([]);
// // // //         }
// // // //       } catch (err) {
// // // //         setError("Failed to fetch your orders.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchOrders();
// // // //   }, []);

// // // //   if (loading) return <p>Loading your orders...</p>;
// // // //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// // // //   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

// // // //   return (
// // // //     <div className="orders-page">
// // // //       <h2>Your Orders</h2>
// // // //       <ul className="order-list">
// // // //         {orders.map((order) => {
// // // //           const firstProduct =
// // // //             order.Items && order.Items.length > 0 ? order.Items[0] : null;
// // // //           // Generate the correct uploads image path!
// // // //           const imageSrc =
// // // //             firstProduct && firstProduct.ImageUrl
// // // //               ? `http://localhost:5000/uploads/${firstProduct.ImageUrl.replace(/^\/?uploads\//, "")}`
// // // //               : "/images/default-product.jpg";

// // // //           return (
// // // //             <li key={order.OrderID} className="order-item">
// // // //               {/* Show first product image from /uploads */}
// // // //               {firstProduct && (
// // // //                 <img
// // // //                   src={imageSrc}
// // // //                   alt={firstProduct.Title || "Product Image"}
// // // //                   className="order-product-img-main"
// // // //                   style={{
// // // //                     width: 120,
// // // //                     height: 120,
// // // //                     objectFit: "cover",
// // // //                     borderRadius: 8,
// // // //                     marginBottom: 12,
// // // //                   }}
// // // //                 />
// // // //               )}
// // // //               {firstProduct && (
// // // //   <img
// // // //     src={imageSrc}
// // // //     alt={firstProduct.Title || "Product Image"}
// // // //     className="order-product-img-main"
// // // //     style={{
// // // //       width: 120,
// // // //       height: 120,
// // // //       objectFit: "cover",
// // // //       borderRadius: 8,
// // // //       marginBottom: 12,
// // // //     }}
// // // //   />
// // // // )}

// // // //               <div>
// // // //                 <strong>Order ID:</strong> #{order.OrderID}
// // // //               </div>
// // // //               <div>
// // // //                 <strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}
// // // //               </div>
// // // //               <div>
// // // //                 <strong>Status:</strong> {order.Status}
// // // //               </div>
// // // //               <div>
// // // //                 <strong>Shipping Address:</strong> {order.Address || "N/A"}
// // // //               </div>
// // // //               <div>
// // // //                 <strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}
// // // //               </div>
// // // //               <div>
// // // //                 <strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}
// // // //               </div>
// // // //               {order.CouponCodes && order.CouponCodes.length > 0 && (
// // // //                 <div>
// // // //                   <strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}
// // // //                 </div>
// // // //               )}
// // // //               <div>
// // // //                 <strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}
// // // //               </div>
// // // //             </li>
// // // //           );
// // // //         })}
// // // //       </ul>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrdersPage;

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import "./OrdersPage.css";

// // // const OrdersPage = () => {
// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchOrders = async () => {
// // //       try {
// // //         const uid = localStorage.getItem("uid");
// // //         if (!uid) {
// // //           setError("Please log in to view orders.");
// // //           setLoading(false);
// // //           return;
// // //         }
// // //         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
// // //         if (Array.isArray(response.data)) {
// // //           setOrders(response.data);
// // //         } else {
// // //           setOrders([]);
// // //         }
// // //       } catch (err) {
// // //         setError("Failed to fetch your orders.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchOrders();
// // //   }, []);

// // //   if (loading) return <p>Loading your orders...</p>;
// // //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// // //   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

// // //   return (
// // //     <div className="orders-page">
// // //       <h2>Your Orders</h2>
// // //       <ul className="order-list">
// // //         {orders.map((order) => {
// // //           const firstProduct =
// // //             order.Items && order.Items.length > 0 ? order.Items[0] : null;
// // //           const imageSrc =
// // //             firstProduct && firstProduct.ImageUrl
// // //               ? `http://localhost:5000/uploads/${firstProduct.ImageUrl.replace(/^\/?uploads\//, "")}`
// // //               : "/images/default-product.jpg";

// // //           return (
// // //             <li key={order.OrderID} className="order-item">
// // //               {/* Show first product image from /uploads */}
// // //               {firstProduct && (
// // //                 // <img
// // //                 //   src={imageSrc}
// // //                 //   alt={firstProduct.Title || "Product Image"}
// // //                 //   className="order-product-img-main"
// // //                 //   style={{
// // //                 //     width: 120,
// // //                 //     height: 120,
// // //                 //     objectFit: "cover",
// // //                 //     borderRadius: 8,
// // //                 //     marginBottom: 12,
// // //                 //   }}
// // //                 // />
// // //                 <img
// // //   src="http://localhost:5000/uploads/1756355921794.jpg"
// // //   alt="Test"
// // //   style={{
// // //     width: 120,
// // //     height: 120,
// // //     objectFit: "cover",
// // //     borderRadius: 8,
// // //     marginBottom: 12,
// // //     border: "1px solid red"
// // //   }}
// // // />

// // //               )}
// // //               <div>
// // //                 <strong>Order ID:</strong> #{order.OrderID}
// // //               </div>
// // //               <div>
// // //                 <strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}
// // //               </div>
// // //               <div>
// // //                 <strong>Status:</strong> {order.Status}
// // //               </div>
// // //               <div>
// // //                 <strong>Shipping Address:</strong> {order.Address || "N/A"}
// // //               </div>
// // //               <div>
// // //                 <strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}
// // //               </div>
// // //               <div>
// // //                 <strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}
// // //               </div>
// // //               {order.CouponCodes && order.CouponCodes.length > 0 && (
// // //                 <div>
// // //                   <strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}
// // //                 </div>
// // //               )}
// // //               <div>
// // //                 <strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}
// // //               </div>
// // //             </li>
// // //           );
// // //         })}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default OrdersPage;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // // import "./OrdersPage.css";

// // const OrdersPage = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const uid = localStorage.getItem("uid");
// //         if (!uid) {
// //           setError("Please log in to view orders.");
// //           setLoading(false);
// //           return;
// //         }
// //         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
// //         if (Array.isArray(response.data)) {
// //           setOrders(response.data);
// //         } else {
// //           setOrders([]);
// //         }
// //       } catch (err) {
// //         setError("Failed to fetch your orders.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchOrders();
// //   }, []);

// //   if (loading) return <p>Loading your orders...</p>;
// //   if (error) return <p style={{ color: "red" }}>{error}</p>;
// //   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

// //   return (
// //     <div className="orders-page">
// //       <h2>Your Orders</h2>
// //       <ul className="order-list">
// //         {orders.map((order) => {
// //           console.log("ORDER:", order);
// //           const firstProduct = order.Items && order.Items.length > 0 ? order.Items[0] : null;
// //           console.log("FIRST PRODUCT:", firstProduct);

// //           const imageSrc =
// //             firstProduct && firstProduct.ImageUrl
// //               ? `http://localhost:5000/uploads/${firstProduct.ImageUrl.replace(/^\/?uploads\//, "")}`
// //               : "/images/default-product.jpg";

// //           console.log("IMAGE SRC:", imageSrc);

// //           return (
// //             <li key={order.OrderID} className="order-item" style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
// //               {firstProduct && firstProduct.ImageUrl ? (
// //                 <img
// //                   src={imageSrc}
// //                   alt={firstProduct.Title || "Product Image"}
// //                   style={{
// //                     width: 120,
// //                     height: 120,
// //                     objectFit: "cover",
// //                     borderRadius: 8,
// //                     marginBottom: 12,
// //                     border: "1px solid #222",
// //                   }}
// //                 />
// //               ) : (
// //                 <img
// //                   src="/images/default-product.jpg"
// //                   alt="Default"
// //                   style={{
// //                     width: 120,
// //                     height: 120,
// //                     objectFit: "cover",
// //                     borderRadius: 8,
// //                     marginBottom: 12,
// //                     opacity: 0.5,
// //                   }}
// //                 />
// //               )}
// //               <div>
// //                 <strong>Order ID:</strong> #{order.OrderID}
// //               </div>
// //               <div>
// //                 <strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}
// //               </div>
// //               <div>
// //                 <strong>Status:</strong> {order.Status}
// //               </div>
// //               <div>
// //                 <strong>Shipping Address:</strong> {order.Address || "N/A"}
// //               </div>
// //               <div>
// //                 <strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}
// //               </div>
// //               <div>
// //                 <strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}
// //               </div>
// //               {order.CouponCodes && order.CouponCodes.length > 0 && (
// //                 <div>
// //                   <strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}
// //                 </div>
// //               )}
// //               <div>
// //                 <strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}
// //               </div>
// //             </li>
// //           );
// //         })}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default OrdersPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "./OrdersPage.css";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const uid = localStorage.getItem("uid");
//         if (!uid) {
//           setError("Please log in to view orders.");
//           setLoading(false);
//           return;
//         }
//         const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
//         if (Array.isArray(response.data)) {
//           setOrders(response.data);
//         } else {
//           setOrders([]);
//         }
//       } catch (err) {
//         setError("Failed to fetch your orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading your orders...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

//   return (
//     <div className="orders-page">
//       <h2>Your Orders</h2>
//       <ul className="order-list" style={{ listStyle: "none", padding: 0 }}>
//         {orders.map((order) => {
//           const firstProduct = order.Items && order.Items.length > 0 ? order.Items[0] : null;
//           const imageSrc =
//             firstProduct && firstProduct.image
//               ? `http://localhost:5000/uploads/${firstProduct.image.replace(/^\/?uploads\//, "")}`
//               : "/images/default-product.jpg";
           
//           return (
//             <li
//               key={order.OrderID}
//               className="order-item"
//               style={{
//                 marginBottom: "20px",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 display: "flex",
//                 gap: "15px",
//                 alignItems: "flex-start",
//               }}
//             >
//               {firstProduct && (
//                 <img
//                   src={imageSrc}
//                   alt={firstProduct.name || "Product Image"}
//                   style={{
//                     width: 120,
//                     height: 120,
//                     objectFit: "cover",
//                     borderRadius: 8,
//                     border: "1px solid #222",
//                   }}
//                 />
//               )}
//               <div>
//                 <div><strong>Order ID:</strong> #{order.OrderID}</div>
//                 <div><strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</div>
//                 <div><strong>Status:</strong> {order.Status}</div>
//                 <div><strong>Shipping Address:</strong> {order.Address || "N/A"}</div>
//                 <div><strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}</div>
//                 <div><strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}</div>
//                 {order.CouponCodes && order.CouponCodes.length > 0 && (
//                   <div><strong>Coupons Used:</strong> {order.CouponCodes.join(", ")}</div>
//                 )}
//                 <div><strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}</div>

//                 {/* Display product details */}
//                 <div style={{ marginTop: "12px" }}>
//                   <h4>Products:</h4>
//                   <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
//                     {order.Items && order.Items.map((product, idx) => (
//                       <li key={idx} style={{ marginBottom: "6px" }}>
//                         <div><strong>Name:</strong> {product.name || "N/A"}</div>
//                         <div><strong>Size:</strong> {product.size || "N/A"}</div>
//                         <div><strong>Color:</strong> {product.color || "N/A"}</div>
//                         <div><strong>Quantity:</strong> {product.quantity || 0}</div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default OrdersPage;


import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const uid = localStorage.getItem("uid");
        if (!uid) {
          setError("Please log in to view orders.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/orders/user/${uid}`);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError("Failed to fetch your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orders || orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <ul className="order-list" style={{ listStyle: "none", padding: 0 }}>
        {orders.map((order) => {
          const firstProduct = order.Items && order.Items.length > 0 ? order.Items[0] : null;
          const imageSrc =
            firstProduct && firstProduct.image
              ? `http://localhost:5000/uploads/${firstProduct.image.replace(/^\/?uploads\//, "")}`
              : "/images/default-product.jpg";

          return (
            <li
              key={order.OrderID}
              className="order-item"
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                gap: "15px",
                alignItems: "flex-start",
              }}
            >
              {firstProduct && (
                <img
                  src={imageSrc}
                  alt={firstProduct.name || "Product Image"}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #222",
                  }}
                />
              )}
              <div>
                <div><strong>Order ID:</strong> #{order.OrderID}</div>
                <div><strong>Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</div>
                <div><strong>Status:</strong> {order.Status}</div>
                <div><strong>Shipping Address:</strong> {order.Address || "N/A"}</div>
                <div><strong>Payment Method:</strong> {order.PaymentMethod || "N/A"}</div>
                <div><strong>Payment Status:</strong> {order.PaymentStatus || "N/A"}</div>
                <div><strong>Total Amount:</strong> ₹{order.FinalAmount || order.TotalPrice || "-"}</div>

                {/* Display all products */}
                <div style={{ marginTop: "12px" }}>
                  <h4>Products:</h4>
                  <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                    {order.Items && order.Items.map((product, idx) => {
                      const productImage = product.image
                        ? `http://localhost:5000/uploads/${product.image.replace(/^\/?uploads\//, "")}`
                        : "/images/default-product.jpg";
                      return (
                        <li key={idx} style={{ marginBottom: "10px" }}>
                          <img
                            src={productImage}
                            alt={product.name}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 6,
                              marginRight: "10px",
                              border: "1px solid #444",
                            }}
                          />
                          <div><strong>Name:</strong> {product.name || "N/A"}</div>
                          <div><strong>Size:</strong> {product.size || "N/A"}</div>
                          <div><strong>Color:</strong> {product.color || "N/A"}</div>
                          <div><strong>Quantity:</strong> {product.quantity || 0}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersPage;
