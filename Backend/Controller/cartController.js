// backend/controllers/cartController.js
const db = require("../db");

// backend/controllers/cartController.js
// exports.addToCart = async (req, res) => {
//   const { uid, pid, variantId, quantity, ImageURL } = req.body;

//   try {
//     // 1. duplicate check
//     const [existing] = await db.query(
//       "SELECT * FROM cart WHERE UID = ? AND PID = ? AND VariantID = ?",
//       [uid, pid, variantId]
//     );
//     if (existing.length) return res.status(409).json({ message: "Item already in cart" });

// let finalImage = (ImageURL || '').trim();
// if (!finalImage || finalImage.toLowerCase() === 'default.jpg') {
//   const [variant] = await db.query(
//     "SELECT VariantImage FROM product_variants WHERE VariantID = ?",
//     [variantId]
//   );
//   finalImage = variant?.[0]?.VariantImage?.trim() || 'default.jpg';
// }
// console.log("🛒 Adding to cart:", {
//   sentImage: ImageURL,
//   finalImage,
// });



// // 2. insert or bump quantity
// await db.query(
//   `INSERT INTO cart (UID, PID, VariantID, Quantity, ImageURL)
//    VALUES (?, ?, ?, ?, ?)
//    ON DUPLICATE KEY UPDATE Quantity = Quantity + VALUES(Quantity),
//    ImageURL  = VALUES(ImageURL)`,
//   [uid, pid, variantId, quantity, finalImage]
// );
//     res.json({ message: "Added to cart successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


exports.addToCart = async (req, res) => {
  const { uid, pid, variantId, quantity = 1, ImageURL } = req.body;

  try {
    // 1. Check if item already exists in cart
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE UID = ? AND PID = ? AND VariantID = ?",
      [uid, pid, variantId]
    );

    // If item exists, update quantity instead of returning error
    if (existing.length > 0) {
      const newQuantity = existing[0].Quantity + quantity;
      await db.query(
        "UPDATE cart SET Quantity = ? WHERE UID = ? AND PID = ? AND VariantID = ?",
        [newQuantity, uid, pid, variantId]
      );
      return res.json({ 
        message: "Quantity increased in cart",
        action: "updated",
        newQuantity 
      });
    }

    // 2. Handle image selection for new items
    let finalImage = (ImageURL || '').trim();
    if (!finalImage || finalImage.toLowerCase() === 'default.jpg') {
      const [variant] = await db.query(
        "SELECT VariantImage FROM product_variants WHERE VariantID = ?",
        [variantId]
      );
      finalImage = variant?.[0]?.VariantImage?.trim() || 'default.jpg';
    }

    console.log("🛒 Adding to cart:", {
      sentImage: ImageURL,
      finalImage,
    });

    // 3. Insert new item
    await db.query(
      `INSERT INTO cart (UID, PID, VariantID, Quantity, ImageURL)
       VALUES (?, ?, ?, ?, ?)`,
      [uid, pid, variantId, quantity, finalImage]
    );

    res.json({ 
      message: "Added to cart successfully",
      action: "added"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update quantity
exports.updateCartQuantity = async (req, res) => {
  const { uid, variantId, quantity } = req.body;

  try {
    await db.query(
      "UPDATE cart SET Quantity = ? WHERE UID = ? AND VariantID = ?",
      [quantity, uid, variantId]
    );
    res.json({ message: "Quantity updated" });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};

// ✅ Delete item from cart
exports.deleteCartItem = async (req, res) => {
  const { uid, variantId } = req.params;

  try {
    await db.query("DELETE FROM cart WHERE UID = ? AND VariantID = ?", [uid, variantId]);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
};



//get cart items
exports.getCartItems = async (req, res) => {
  const { uid } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT
        cart.CartID,
        cart.PID,
        cart.VariantID,
        cart.Quantity,
        cart.ImageURL as cartImage,
        products.Name,
        products.Price,
        products.Images as productImages,
        product_variants.Color,
        product_variants.Size,
        product_variants.VariantImage
      FROM cart
      JOIN products ON cart.PID = products.PID
      JOIN product_variants ON cart.VariantID = product_variants.VariantID
      WHERE cart.UID = ?
    `, [uid]);

    const cartItems = rows.map(item => {
      // Priority: 1. VariantImage 2. cartImage 3. First product image 4. default.jpg
      let image = item.VariantImage?.trim();
      
      if (!image || image === 'default.jpg') {
        image = item.cartImage?.trim();
      }
      
      if (!image || image === 'default.jpg') {
        // Get first product image if available
        const productImages = item.productImages 
          ? (Array.isArray(item.productImages) 
              ? item.productImages 
              : item.productImages.split(',').map(img => img.trim()))
          : [];
        image = productImages[0] || 'default.jpg';
      }

      console.log("🧾 Final image selected:", image);

      return {
        cartId: item.CartID,
        pid: item.PID,
        variantId: item.VariantID,
        quantity: item.Quantity,
        name: item.Name,
        price: item.Price,
        color: item.Color,
        size: item.Size,
        image: image,
      };
    });

    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Failed to load cart items" });
  }
};

// ✅ Clear all items from cart
exports.clearCart = async (req, res) => {
  const { uid } = req.params;

  try {
    await db.query("DELETE FROM cart WHERE UID = ?", [uid]);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
