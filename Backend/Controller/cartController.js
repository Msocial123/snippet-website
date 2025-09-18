// backend/controllers/cartController.js
const db = require("../db");

// Add to Cart
exports.addToCart = async (req, res) => {
  const { uid, pid, variantId, quantity = 1, ImageURL } = req.body;

  try {
    // 1. Check if item already exists
    const [existing] = await db.query(
      "SELECT * FROM cart WHERE UID = ? AND PID = ? AND VariantID = ?",
      [uid, pid, variantId]
    );

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

    // 2. Decide final image
    let finalImage = (ImageURL || "").trim();

    // If frontend image is invalid or default
    if (!finalImage || finalImage.toLowerCase() === "default.jpg") {
      // Try variant image first
      const [variant] = await db.query(
        "SELECT VariantImage FROM product_variants WHERE VariantID = ?",
        [variantId]
      );

      if (variant?.[0]?.VariantImage && variant[0].VariantImage.trim().toLowerCase() !== "default.jpg") {
        finalImage = variant[0].VariantImage.trim();
      } else {
        // Try first product image from products.Images
        const [product] = await db.query(
          "SELECT Images FROM products WHERE PID = ?",
          [pid]
        );

        if (product?.[0]?.Images) {
          try {
            // If stored as JSON array
            const parsed = JSON.parse(product[0].Images);
            if (Array.isArray(parsed) && parsed.length > 0) {
              finalImage = parsed[0].trim();
            }
          } catch {
            // Fallback to comma-separated string
            const imgArr = product[0].Images.split(",").map(img => img.trim());
            if (imgArr.length > 0) {
              finalImage = imgArr[0];
            }
          }
        }
      }
    }

    // Final fallback
    if (!finalImage) {
      finalImage = "default.jpg";
    }

    console.log("🛒 Adding to cart with image:", finalImage);

    // 3. Insert into cart
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
    console.error("❌ addToCart Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Cart Items
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
      // Priority: VariantImage → cartImage → first product image → default.jpg
      let image = item.VariantImage?.trim();

      if (!image || image.toLowerCase() === 'default.jpg') {
        if (item.cartImage && item.cartImage.trim().toLowerCase() !== 'default.jpg') {
          image = item.cartImage.trim();
        }
      }

      if (!image || image.toLowerCase() === 'default.jpg') {
        let productImages = [];
        if (item.productImages) {
          try {
            const parsed = JSON.parse(item.productImages);
            if (Array.isArray(parsed)) {
              productImages = parsed.map(img => img.trim());
            } else if (typeof parsed === 'string') {
              productImages = [parsed.trim()];
            }
          } catch {
            productImages = item.productImages.split(',').map(img => img.trim());
          }
        }
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
        image
      };
    });

    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ message: "Failed to load cart items" });
  }
};

// ✅ Update quantity
exports.updateCartQuantity = async (req, res) => {
  const { uid, variantId, quantity } = req.body;
 console.log('Received quantity update:', { uid, variantId, quantity });
  try {
    await db.query(
      "UPDATE cart SET Quantity = ? WHERE UID = ? AND VariantID = ?",
      [quantity, uid, variantId]
    );
        console.log('Quantity updated successfully');
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
