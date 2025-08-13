

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
              <ProductCard product={item} disableWishlist={true} />
<button
  className="wishlist-toggle active"
  onClick={() => toggleWishlist(item.PID)}
>
  <FaHeart color="red" />
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
