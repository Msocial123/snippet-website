// import React, { useContext, useEffect, useState } from "react";
// import { CartContext } from "../Components/CartContext";
// import axios from "axios";
// import "./CartPage.css";
// import { useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const {
//     cartItems,
//     clearCart,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//   } = useContext(CartContext);

//   const uid = localStorage.getItem("uid");
//   const [message, setMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Cart Items:", cartItems);
//   }, [cartItems]);

//   const handlePlaceOrder = async () => {
//     // ... existing order placement logic ...
//   };

//   const navigateToProduct = (pid) => {
//     navigate(`/product/${pid}`);
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-left">
//         <h2>Your Shopping Cart</h2>
//         <button className="cart-close-button" onClick={() => navigate(-1)}>X</button>

//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="cart-list">
//               {cartItems.map((item, index) => (
//                 <li key={index} className="cart-item">
//                   <div 
//                     className="cart-item-clickable"
//                     onClick={() => navigateToProduct(item.pid)}
//                   >
//                     <img
//                       src={`/images/${item.image}`}
//                       alt={item.name}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/images/default.jpg";
//                       }}
//                       style={{ 
//                         width: 80, 
//                         height: 80, 
//                         objectFit: "cover", 
//                         borderRadius: 4,
//                         cursor: 'pointer' 
//                       }}
//                     />
//                     <div className="cart-item-details">
//                       <h3 style={{ cursor: 'pointer' }}>{item.name}</h3>
//                       <p>Color: {item.color}</p>
//                       <p>Size: {item.size}</p>
//                       <p className="cart-price">₹{item.price}</p>
//                     </div>
//                   </div>
//                   <div className="cart-controls">
//                     <button onClick={() => decreaseQuantity(item.variantId)}>
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => increaseQuantity(item.variantId)}>
//                       +
//                     </button>
//                     <button
//                       id="delete-btn1"
//                       onClick={() => removeFromCart(item.variantId)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>

//       <div className="cart-right">
//         {/* ... existing cart summary code ... */}
//       </div>

//       {selectedImage && (
//         <div className="image-preview-popup">
//           {/* ... existing preview code ... */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Components/CartContext";
import axios from "axios";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const uid = localStorage.getItem("uid");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    // ... existing order placement logic ...
  };

  const navigateToProduct = (pid) => {
    navigate(`/product/${pid}`);
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Your Shopping Cart</h2>
        <button className="cart-close-button" onClick={() => navigate(-1)}>X</button>

        {/* {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : ( */}
          {!uid ? (
    <p>Please log in to view your cart</p>
  ) : cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <div 
                    className="cart-item-clickable"
                    onClick={() => navigateToProduct(item.pid)}
                  >
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default.jpg";
                      }}
                      style={{ 
                        width: 80, 
                        height: 80, 
                        objectFit: "cover", 
                        borderRadius: 4,
                        cursor: 'pointer' 
                      }}
                    />
                    <div className="cart-item-details">
                      <h3 style={{ cursor: 'pointer' }}>{item.name}</h3>
                      <p>Color: {item.color}</p>
                      <p>Size: {item.size}</p>
                      <p className="cart-price">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="cart-controls">
                    <button onClick={() => decreaseQuantity(item.variantId)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.variantId)}>
                      +
                    </button>
                    <button
                      id="delete-btn1"
                      onClick={() => removeFromCart(item.variantId)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="cart-right">
        {/* ... existing cart summary code ... */}
      </div>

      {selectedImage && (
        <div className="image-preview-popup">
          {/* ... existing preview code ... */}
        </div>
      )}
    </div>
  );
};

export default CartPage;