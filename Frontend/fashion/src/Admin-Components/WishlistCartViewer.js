// src/components/WishlistCartViewer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WishlistCartViewer.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function WishlistCartViewer() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [wlRes, cartRes] = await Promise.all([
        axios.get(`${API_BASE}/api/admin/wishlist-cart/wishlist`),
        axios.get(`${API_BASE}/api/admin/wishlist-cart/cart`),
      ]);
      setWishlist(wlRes.data);
      setCart(cartRes.data);
    } catch (err) {
      console.error("Error fetching wishlist/cart:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="wcv-root">Loading...</div>;

  return (
    <div className="wcv-root">
      <h1 className="wcv-title">Wishlist & Cart Viewer</h1>

      {/* Wishlist */}
      <section className="wcv-section">
        <h2 className="wcv-sub">View products in each user's wishlist</h2>
        <div className="wcv-table-wrap">
          <table className="wcv-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.length === 0 ? (
                <tr><td colSpan="4">No wishlist entries found.</td></tr>
              ) : (
                wishlist.map((r) => (
                  <tr key={`w-${r.WishlistID}`}>
                    <td>{r.user}</td>
                    <td>{r.product}</td>
                    <td>{r.price ? `$${r.price}` : "-"}</td>
                    <td>
                      {r.image ? (
                        <img src={r.image} alt={r.product} className="wcv-thumb" />
                      ) : (
                        <span className="wcv-noimg">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cart */}
      <section className="wcv-section">
        <h2 className="wcv-sub">View cart contents</h2>
        <div className="wcv-table-wrap">
          <table className="wcv-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr><td colSpan="5">No cart items found.</td></tr>
              ) : (
                cart.map((r) => (
                  <tr key={`c-${r.CartID}`}>
                    <td>{r.user}</td>
                    <td>{r.product}</td>
                    <td>{r.quantity}</td>
                    <td>{r.price ? `$${r.price}` : "-"}</td>
                    <td>
                      {r.image ? (
                        <img src={r.image} alt={r.product} className="wcv-thumb" />
                      ) : (
                        <span className="wcv-noimg">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
