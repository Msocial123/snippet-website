// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./CartDrawer.css";
// import { CartContext } from "./CartContext";

// const CartDrawer = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const {
//     cartItems,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//   } = React.useContext(CartContext);

//   const handlePlaceOrder = () => {
//     alert("Proceed to place order!");
//     onClose();
//   };

//   const navigateToProduct = (productId) => {
//     if (!productId) {
//       console.error("No product ID found for navigation");
//       return;
//     }
//     navigate(`/product/${productId}`);
//     onClose();
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
//       <div className="drawer-header">
//         <h3>Your Cart ({cartItems.length})</h3>
//         <button className="close-btn" onClick={onClose}>✕</button>
//       </div>
      
//       <div className="drawer-content">
//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <p>Your cart is empty</p>
//             <button 
//               className="continue-shopping"
//               onClick={() => {
//                 navigate("/products");
//                 onClose();
//               }}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           cartItems.map((item) => {
//             // Get product ID from whichever field exists
//             const productId = item.pid || item.productId || item.id;
            
//             return (
//               <div className="drawer-item" key={item.variantId}>
//                 <div 
//                   className="product-image-container"
//                   onClick={() => navigateToProduct(productId)}
//                 >
//                   <img
//                     src={item.image 
//                       ? `/images/${item.image.replace(/^\/?images\//, '')}`
//                       : "/images/default-product.jpg"
//                     }
//                     alt={item.name}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/images/default-product.jpg";
//                     }}
//                     className="cart-item-image"
//                   />
//                 </div>
                
//                 <div className="item-details">
//                   <h4 onClick={() => navigateToProduct(productId)}>{item.name}</h4>
//                   <p>Color: {item.color}</p>
//                   <p>Size: {item.size}</p>
//                   <p className="price">₹{item.price}</p>
                  
//                   <div className="item-controls">
//                     <div className="quantity-control">
//                       <button onClick={(e) => {
//                         e.stopPropagation();
//                         decreaseQuantity(item.variantId);
//                       }}>-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={(e) => {
//                         e.stopPropagation();
//                         increaseQuantity(item.variantId);
//                       }}>+</button>
//                     </div>
//                     <button 
//                       className="remove-btn"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeFromCart(item.variantId);
//                       }}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="drawer-footer">
//           <div className="total-section">
//             <span>Subtotal:</span>
//             <span className="total-amount">₹{total}</span>
//           </div>
//           <button 
//             className="checkout-btn" 
//             onClick={handlePlaceOrder}
//           >
//             Order Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartDrawer;










import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartDrawer.css";
import { CartContext } from "./CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = React.useContext(CartContext);

  const handlePlaceOrder = () => {
    alert("Proceed to place order!");
    onClose();
  };

  const navigateToProduct = (productId) => {
    if (!productId) {
      console.error("No product ID found for navigation");
      return;
    }
    navigate(`/product/${productId}`);
    onClose();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h3>Your Cart ({cartItems.length})</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="drawer-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="continue-shopping"
              onClick={() => {
                navigate("/products");
                onClose();
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartItems.map((item) => {
            // Get product ID from whichever field exists
            const productId = item.pid || item.productId || item.id;
            
            return (
              <div className="drawer-item" key={item.variantId}>
                <div 
                  className="product-image-container"
                  onClick={() => navigateToProduct(productId)}
                >
                  <img
                    src={item.image 
                      ? `/images/${item.image.replace(/^\/?images\//, '')}`
                      : "/images/default-product.jpg"
                    }
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-product.jpg";
                    }}
                    className="cart-item-image"
                  />
                </div>
                
                <div className="item-details">
                  <h4 onClick={() => navigateToProduct(productId)}>{item.name}</h4>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p className="price">₹{item.price}</p>
                  
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        decreaseQuantity(item.variantId);
                      }}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        increaseQuantity(item.variantId);
                      }}>+</button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.variantId);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="drawer-footer">
          <div className="total-section">
            <span>Subtotal:</span>
            <span className="total-amount">₹{total}</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={handlePlaceOrder}
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
