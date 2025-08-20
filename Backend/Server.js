



const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./db");



const {
  signup,
  googleSignup,
  facebookSignup
} = require("./Controller/Signupcontroller");
const authController = require("./Controller/authController");
// const productController = require("./Controller/productController");
const landingPageRoutes = require("./Controller/Landingpagecontroller");

// Add with other route imports
const searchRoutes = require('./Routes/searchRoutes');

// Routers
// const productRoutes = require("./Routes/productRoutes");
const wishlistRoutes = require("./Routes/wishlist"); // ✅ FIXED

const orderRoutes = require("./Routes/orderRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));



// API Routes
app.post("/api/signup", signup);
app.post("/api/google-signup", googleSignup);
app.post("/api/facebook-signup", facebookSignup);

// const landingPageRoutes = require('./Controller/Landingpagecontroller');
// const authController = require('./Controller/authController');
// const productmanagerRoutes = require("./Routes/ProductmanagerRoutes");
const productController = require('./Controller/productController');
const cartRoutes = require("./Routes/cartRoutes");
const variantRoutes = require("./Routes/variantRoutes");
const variantController = require('./Controller/variantController');
const productRoutes = require("./Routes/productRoutes");

app.get("/api/products/women", productController.getWomenProducts);

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
// app.use("/api/manageproducts", productmanagerRoutes); // Product Manager Routes
// ✅ Auth Routes

app.post("/login", authController.login);
app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);

app.use('/api/search', searchRoutes);

app.use("/api/products", landingPageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes); // ✅ correct now

// Product APIs

// ✅ Product Routes

app.get("/api/products", productController.getAllProducts);
app.get("/api/products/category/:category", productController.getProductsByCategory);
app.get("/api/products/:id", productController.getProductById);
app.get("/api/reviews/:id", productController.getProductReviews);

// app.get("/api/products/women", productController.getWomenProducts);

// Start Server


// ✅ Cart Routes
app.use("/api/cart", cartRoutes);

// ✅ Variant Routes
app.use("/api/variants", variantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

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


