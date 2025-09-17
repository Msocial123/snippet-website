const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Controllers
const adminProducts = require("./Controller/adminProductsController.js");
const adminOrdersRouter = require("./Routes/adminOrders");


const {
  signup,
  googleSignup,
  facebookSignup
} = require("./Controller/Signupcontroller");
const authController = require("./Controller/authController");
const landingPageRoutes = require("./Controller/Landingpagecontroller");
const productController = require("./Controller/productController");
const variantController = require("./Controller/variantController");

const userRoutes = require("./Routes/userRoutes");
// Routes
const searchRoutes = require("./Routes/searchRoutes");
const wishlistRoutes = require("./Routes/wishlist");
const orderRoutes = require("./Routes/orderRoutes");


const couponRoutes = require("./Routes/couponRoutes"); // ✅ Import

const paymentRoutes = require("./Routes/paymentRoutes");

const variantsRouter = require('./routes/variants');


const reviewsRouter = require('./Routes/reviews');
// Middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes
app.post("/api/signup", signup);
app.post("/api/google-signup", googleSignup);
app.post("/api/facebook-signup", facebookSignup);


const cartRoutes = require("./Routes/cartRoutes");
const variantRoutes = require("./Routes/variantRoutes");
const productRoutes = require("./Routes/productRoutes");

// Middleware
const ordersPageRoutes = require("./Routes/ordersPageRoutes");

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/public', express.static('public'));

// Logger
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

// Routes

app.use("/api/admin/products", adminProducts);
app.use("/api/admin/users", userRoutes);
// app.use("/api", userRoutes);
app.post("/api/signup", signup);
app.post("/api/google-signup", googleSignup);
app.post("/api/facebook-signup", facebookSignup);

app.use("/api/products", landingPageRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/search", searchRoutes);

// Auth Routes
app.post("/login", authController.login);
app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);
// app.get("/api/profile", authController.getUserProfile);
app.get("/api/profile/:uid", authController.getUserProfile);



// Product APIs
// app.get("/api/products", productController.getAllProducts);
// app.get("/api/products/category/:category", productController.getProductsByCategory);
// app.get("/api/products/:id", productController.getProductById);
// app.get("/api/reviews/:id", productController.getProductReviews);
// app.get("/api/products/women", productController.getWomenProducts);

// Variant APIs
app.get("/api/variants", variantController.getVariantsByProductId);
app.get("/api/variants/by-attributes", variantController.getVariantByAttributes);


// Start Server

app.use("/api/coupons", couponRoutes); // ✅ Base path

app.use("/api/payments", paymentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// mount admin wishlist/cart routes
const wishlistCartRoutes = require("./Routes/adminWishlistCart");
app.use("/api/admin/wishlist-cart", wishlistCartRoutes);

const reportsRoutes = require("./Routes/reports");
app.use("/api/reports", reportsRoutes);

const inventoryRoutes = require("./Routes/inventoryRoutes");
app.use("/api/inventory", inventoryRoutes);

const adminRoutes = require("./Routes/admin");
app.use("/api/admin", adminRoutes);


// Routes
app.use("/api/admin/orders", adminOrdersRouter);

// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/variants', variantsRouter);

app.use("/api/orders", ordersPageRoutes);
app.get("/", (req, res) => {
  res.send("Snitch Store API running");
});


app.use('/api/reviews', reviewsRouter);











////////////////////////////////ADMIN AUTH & SESSIONS////////////////////////////////////

// ✅ Allow React frontend with credentials

// ✅ Session setup
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // use true only with https
  })
);

// ✅ Hardcoded Admin (with bcrypt hash)
const ADMIN = {
  email: "admin@snippet.com",
  passwordHash: bcrypt.hashSync("Admin@123", 10),
};

// ✅ Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Incoming login:", email, password);

  if (email !== ADMIN.email) {
    console.log("❌ Wrong email");
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const validPass = await bcrypt.compare(password, ADMIN.passwordHash);
  console.log("🔑 Password valid?", validPass);

  if (!validPass) {
    console.log("❌ Wrong password");
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  req.session.admin = true;
  res.json({ message: "Login successful", admin: true });
});

// ✅ Logout Route
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout successful" });
  });
});

// ✅ Check Session Route
app.get("/api/admin/check", (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
});

// ✅ Example: static files, routes
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Snitch Store API running");
});

const addressRoutes = require("./Routes/addressRoutes");
app.use("/api/addresses", addressRoutes);
const profileRoutes = require("./Routes/profileRoutes");
app.use("/api", profileRoutes);

const notificationRoutes = require("./Routes/notificationRoutes");
app.use("/api", notificationRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log("✅ Registering product routes at /api/products");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

