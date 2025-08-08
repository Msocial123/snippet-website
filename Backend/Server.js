const express = require('express');
const cors = require('cors');
const path = require('path');

const {
  signup,
  googleSignup,
  facebookSignup
} = require('./Controller/Signupcontroller');

const landingPageRoutes = require('./Controller/Landingpagecontroller');
const authController = require('./Controller/authController');
const productController = require('./Controller/productController');
const cartRoutes = require("./routes/cartRoutes");
const variantRoutes = require("./routes/variantRoutes");
const variantController = require('./Controller/variantController');
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Static Files
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/public', express.static('public'));

// Logger Middleware
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

// ✅ Signup Routes
app.post('/api/signup', signup);
app.post('/api/google-signup', googleSignup);
app.post('/api/facebook-signup', facebookSignup);

// ✅ Landing Page Product Routes
app.use('/api/products', landingPageRoutes); // includes /landing & /reviews

// ✅ Auth Routes
app.post("/login", authController.login);
app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);

// ✅ Product Routes
app.get("/api/products", productController.getAllProducts);
app.get("/api/products/category/:category", productController.getProductsByCategory);
app.get("/api/products/:id", productController.getProductById);
app.get("/api/reviews/:id", productController.getProductReviews);

// ✅ Cart Routes
app.use("/api/cart", cartRoutes);

// ✅ Variant Routes
app.use("/api/variants", variantRoutes);
app.use("/api/products", productRoutes);
// Optionally, expose one specific controller function directly:
// If you want to get all variants for a product by pid
app.get("/api/variants", variantController.getVariantsByProductId);


// If you want to get a variant by color and size
app.get("/api/variants/by-attributes", variantController.getVariantByAttributes);
// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("✅ Registering product routes at /api/products");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
