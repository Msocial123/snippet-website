// frontend/Components/CartContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cartItems, setCartItems] = useState(() => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

  const uid = () => Number(localStorage.getItem("uid")) || 1;

// In your CartContext.js, update the fetchCartItems function:
const fetchCartItems = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/cart/${uid()}`);

    const formatted = data.map((item) => ({
      cartId: item.CartID,
      pid: item.PID,
      name: item.Name || 'Unnamed',
      price: Number(item.Price || 0),
      quantity: Number(item.Quantity || 1),
      color: item.Color,
      size: item.Size,
      variantId: item.VariantID,
      image: item.image?.trim() || 'default.jpg' // Use the image from backend directly
    }));

    setCartItems(formatted);
  } catch (err) {
    console.error("❌ Failed to load cart items", err);
  }
};


  const addToCart = async (payload) => {
  try {
    await axios.post("http://localhost:5000/api/cart", {
      uid: uid(),
      pid: payload.PID,
      variantId: payload.VariantID,
      quantity: payload.Quantity || 1,
      color: payload.Color,
      size: payload.Size,
      ImageURL: payload.ImageURL, // <-- Use ImageURL, matches backend and ProductDetail.js
    });
    await fetchCartItems();
  } catch (err) {
    console.error("Failed to add to cart:", err);
  }
};

  
  // * UPDATE quantity
  
  const updateQty = async (variantId, newQty) => {
    try {
      await axios.patch("http://localhost:5000/api/cart/update-quantity", {
        uid: uid(),
        variantId,
        quantity: newQty,
      });
      await fetchCartItems();
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  /* -------------------------------------------------
   * DELETE item
   * -------------------------------------------------*/
  const removeFromCart = async (variantId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/delete/${uid()}/${variantId}`
      );
      await fetchCartItems();
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  /* -------------------------------------------------
   * CLEAR cart
   * -------------------------------------------------*/
  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/clear/${uid()}`);
      setCartItems([]);
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
    }
  };

  /* -------------------------------------------------
   * Quantity helpers
   * -------------------------------------------------*/
  const increaseQuantity = (variantId) => {
    const item = cartItems.find((i) => i.variantId === variantId);
    if (item) updateQty(variantId, item.quantity + 1);
  };

  const decreaseQuantity = (variantId) => {
    const item = cartItems.find((i) => i.variantId === variantId);
    if (item && item.quantity > 1) updateQty(variantId, item.quantity - 1);
  };

  /* -------------------------------------------------
   * Initial load
   * -------------------------------------------------*/
  useEffect(() => {
    fetchCartItems();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        clearCart,
        fetchCartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};