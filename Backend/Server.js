
// const db = require("./db");

// const express = require('express');
// const cors = require('cors');
// const {
//   signup,
//   googleSignup,
//   facebookSignup
// } = require('./Controller/Signupcontroller');

// const landingPageRoutes = require('./Controller/Landingpagecontroller'); // ✅ FIXED: Import routes
// const authController = require('./Controller/authController'); // ✅ Add this line
// const productController = require('./Controller/productController'); // ✅ Add this if missing
// const wishlistController = require('./Controller/wishlistController'); // ✅ Add this if missing
// // const reviewRoutes = require('.//reviewRoutes');

// const productRoutes = require('./Routes/productRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.get("/api/reviews/:id", productController.getProductReviews);
// const path = require('path');
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use('/api', wishlistController);
// // ✅ Signup Routes
// app.post('/api/signup', signup);
// app.post('/api/google-signup', googleSignup);
// app.post('/api/facebook-signup', facebookSignup);

// // ✅ Product + Reviews Routes
// app.use('/api/products', landingPageRoutes); // Routes are: /api/products/landing & /api/products/reviews
// app.use('/api/products', productRoutes);
// app.post("/login", authController.login);
// app.post("/forgot-password", authController.forgotPassword);
// app.post("/reset-password", authController.resetPassword);


// // ✅ Product Routes
// app.get("/api/products", productController.getAllProducts);
// app.get("/api/products/category/:category", productController.getProductsByCategory);
// app.get("/api/products/:id", productController.getProductById);
// app.get("/api/reviews/:id", productController.getProductReviews);
// app.get("/api/products/women", productController.getWomenProducts);
// const wishlistRoutes = require("./Routes/wishlist")(db);
// app.use("/api/wishlist", wishlistRoutes);
// // ✅ Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./db");

// Controllers
const {
  signup,
  googleSignup,
  facebookSignup
} = require("./Controller/Signupcontroller");
const authController = require("./Controller/authController");
const productController = require("./Controller/productController");
const landingPageRoutes = require("./Controller/Landingpagecontroller");

// Routers
const productRoutes = require("./Routes/productRoutes");
const wishlistRoutes = require("./Routes/wishlist"); // ✅ FIXED

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));



// API Routes
app.post("/api/signup", signup);
app.post("/api/google-signup", googleSignup);
app.post("/api/facebook-signup", facebookSignup);
app.post("/login", authController.login);
app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);

app.use("/api/products", landingPageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes); // ✅ correct now

// Product APIs
app.get("/api/products", productController.getAllProducts);
app.get("/api/products/category/:category", productController.getProductsByCategory);
app.get("/api/products/:id", productController.getProductById);
app.get("/api/reviews/:id", productController.getProductReviews);
app.get("/api/products/women", productController.getWomenProducts);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
