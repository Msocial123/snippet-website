// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ProductCard from "./ProductCard";

// const WishlistPage = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [UID, setUID] = useState(null);

//   // ✅ Safely load UID from localStorage
//   useEffect(() => {
//     try {
//       const userData = localStorage.getItem("user");
//       console.log("Raw user data from localStorage:", userData);

//       if (userData && userData !== "undefined") {
//         const userObj = JSON.parse(userData);
//         if (userObj && userObj.UID) {
//           setUID(userObj.UID);
//         } else {
//           toast.error("Invalid user data. Please log in again.");
//         }
//       } else {
//         toast.error("Please log in to use wishlist");
//       }
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       toast.error("Login info corrupted. Please log in again.");
//     }
//   }, []);

//   // ✅ Fetch wishlist if UID is valid
//   useEffect(() => {
//     if (UID) {
//       fetchWishlist();
//     }
//   }, [UID]);

//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get(`/api/wishlist/${UID}`);
//       setWishlistItems(res.data);
//     } catch (err) {
//       console.error("Failed to load wishlist", err);
//       toast.error("Failed to load wishlist");
//     }
//   };

//   const toggleWishlist = async (PID, isWishlisted) => {
//     try {
//       if (isWishlisted) {
//         await axios.delete("/api/wishlist/remove", { data: { UID, PID } });
//         toast.success("Removed from wishlist");
//       } else {
//         await axios.post("/api/wishlist/add", { UID, PID });
//         toast.success("Added to wishlist");
//       }
//       fetchWishlist(); // Refresh
//     } catch (error) {
//       console.error("Wishlist toggle failed", error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <h2>Your Wishlist</h2>
//       <div className="wishlist-grid">
//         {wishlistItems.length > 0 ? (
//           wishlistItems.map((item) => (
//             <div key={item.PID} className="wishlist-item-wrapper" style={{ position: "relative" }}>
//               <ProductCard product={item} />
//               <button
//                 className="wishlist-toggle"
//                 onClick={() => toggleWishlist(item.PID, true)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   background: "none",
//                   border: "none",
//                   fontSize: "1.5rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 💖
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="no-wishlist-message">Your wishlist is empty</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ProductCard from "./ProductCard";

// const WishlistPage = () => {
//   const [UID, setUID] = useState(null);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   // ✅ Extract UID from localStorage on mount
//   useEffect(() => {
//     try {
//       const userData = localStorage.getItem("user");
//       if (userData && userData !== "undefined") {
//         const parsedUser = JSON.parse(userData);
//         if (parsedUser?.UID) {
//           setUID(parsedUser.UID);
//         } else {
//           toast.error("Please log in to use wishlist");
//         }
//       } else {
//         toast.error("Please log in to use wishlist");
//       }
//     } catch (error) {
//       console.error("Error parsing user from localStorage:", error);
//       toast.error("Please log in to use wishlist");
//     }
//   }, []);

//   // ✅ Fetch wishlist only after UID is set
//   useEffect(() => {
//     if (UID) {
//       fetchWishlist();
//     }
//   }, [UID]);

//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/wishlist/${UID}`);
//       setWishlistItems(res.data);
//     } catch (err) {
//       console.error("Failed to fetch wishlist", err);
//       toast.error("Failed to load wishlist");
//     }
//   };

//   const toggleWishlist = async (PID, isWishlisted) => {
//     try {
//       if (!UID) {
//         toast.error("You must be logged in to modify wishlist");
//         return;
//       }

//       if (isWishlisted) {
//         await axios.delete("http://localhost:5000/api/wishlist/remove", {
//           data: { UID, PID },
//         });
//         toast.success("Removed from wishlist");
//       } else {
//         await axios.post("http://localhost:5000/api/wishlist/add", {
//           UID,
//           PID,
//         });
//         toast.success("Added to wishlist");
//       }

//       fetchWishlist(); // Refresh after change
//     } catch (err) {
//       console.error("Error updating wishlist:", err);
//       toast.error("Failed to update wishlist");
//     }
//   };

//   return (
//     <div>
//       <h2>Your Wishlist</h2>
//       {UID ? (
//         <div className="wishlist-grid">
//           {wishlistItems.length > 0 ? (
//             wishlistItems.map((item) => (
//               <div
//                 key={item.PID}
//                 className="wishlist-item-wrapper"
//                 style={{ position: "relative" }}
//               >
//                 <ProductCard product={item} />
//                 <button
//                   className="wishlist-toggle"
//                   onClick={() => toggleWishlist(item.PID, true)}
//                   style={{
//                     position: "absolute",
//                     top: "10px",
//                     right: "10px",
//                     background: "none",
//                     border: "none",
//                     fontSize: "1.5rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   💖
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="no-wishlist-message">Your wishlist is empty</p>
//           )}
//         </div>
//       ) : (
//         <p className="no-wishlist-message">Please log in to use wishlist</p>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;



// WishlistPage.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProductCard from "./ProductCard";
// import "./Wishlistpage.css";

// const WishlistPage = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [message, setMessage] = useState("");

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const UID = storedUser?.UID;

//   const fetchWishlist = async (UID) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/wishlist/fetch/${UID}`);
//       const data = await response.json();
//       setWishlist(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error.message);
//       toast.error("❌ Could not load wishlist");
//       setWishlist([]);
//     }
//   };

//   useEffect(() => {
//     if (!UID) {
//       setMessage("Please log in to use wishlist");
//       return;
//     }
//     fetchWishlist(UID);
//   }, [UID]);

//   const toggleWishlist = async (PID, isWishlisted) => {
//     try {
//       if (!UID) {
//         toast.error("⚠️ Login required");
//         return;
//       }

//       if (isWishlisted) {
//         await axios.delete("http://localhost:5000/api/wishlist/remove", {
//           data: { UID, PID },
//         });
//         toast.info("💔 Removed from wishlist");
//       } else {
//         await axios.post("http://localhost:5000/api/wishlist/add", {
//           UID,
//           PID,
//         });
//         toast.success("💖 Added to wishlist");
//       }

//       fetchWishlist(UID);
//     } catch (err) {
//       console.error("Error updating wishlist:", err);
//       toast.error("❌ Could not update wishlist");
//     }
//   };

//   return (
//     <div className="wishlist-page">
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss={false}
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       <h2 className="wishlist-heading">Your Wishlist</h2>

//       {!UID ? (
//         <p className="no-wishlist-message">Please log in to view your wishlist</p>
//       ) : wishlist.length > 0 ? (
//         <div className="wishlist-grid">
//           {wishlist.map((item) => (
//             <div
//               key={item.PID}
//               className="wishlist-item-wrapper"
//               style={{ position: "relative" }}
//             >
//               <ProductCard product={item} />
//               <button
//                 className="wishlist-toggle"
//                 onClick={() => toggleWishlist(item.PID, true)}
//               >
//                 💖
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-wishlist-message">Your wishlist is empty</p>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from "./ProductCard";
import "./Wishlistpage.css";
import { FaHeart } from "react-icons/fa";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const UID = storedUser?.UID;

  const fetchWishlist = async (UID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/fetch/${UID}`);
      const data = await response.json();
      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Unable to load wishlist");
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (!UID) {
      setMessage("Please log in to use wishlist");
      return;
    }
    fetchWishlist(UID);
  }, [UID]);

  const isInWishlist = (PID) => {
    return wishlist.some(item => item.PID === PID);
  };

  const toggleWishlist = async (PID) => {
    try {
      if (!UID) {
        toast.error("Please login to modify wishlist");
        return;
      }

      const exists = isInWishlist(PID);

      if (exists) {
        await axios.delete("http://localhost:5000/api/wishlist/remove", {
          data: { UID, PID },
        });
        toast.info("💔 Removed from wishlist");
      } else {
        await axios.post("http://localhost:5000/api/wishlist/add", {
          UID,
          PID,
        });
        toast.success("❤️ Added to wishlist");
      }

      fetchWishlist(UID);
    } catch (err) {
      toast.error("Error updating wishlist");
    }
  };

  return (
    <div className="wishlist-page">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        transition={Slide}
        toastClassName="custom-toast"
      />

      <h2 className="wishlist-heading">Your Wishlist</h2>

      {!UID ? (
        <p className="no-wishlist-message">{message}</p>
      ) : wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.PID} className="wishlist-item-wrapper">
              <ProductCard product={item} />
              <button
                className={`wishlist-toggle ${isInWishlist(item.PID) ? "active" : ""}`}
                onClick={() => toggleWishlist(item.PID)}
              >
                <FaHeart />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-wishlist-message">Your wishlist is empty</p>
      )}
    </div>
  );
};

export default WishlistPage;
