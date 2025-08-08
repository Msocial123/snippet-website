// const db = require("../db");

// // ✅ Get All Products (e.g., for homepage)
// exports.getAllProducts = async (req, res) => {
//   const query = `
//     SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images
//     FROM products p
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     ORDER BY p.CreatedAt DESC
//   `;

//   try {
//     const [results] = await db.query(query);

//     const parsed = results.map((row) => ({
//       ...row,
//       Images: (() => {
//         try {
//           const parsed = JSON.parse(row.Images);
//           return Array.isArray(parsed) ? parsed[0] : parsed;
//         } catch (e) {
//           return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
//         }
//       })(),
//     }));

//     res.json(parsed);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch products", error: err.message });
//   }
// };

// // ✅ Get products by category
// exports.getProductsByCategory = async (req, res) => {
//   const { category } = req.params;

//   const query = `
//     SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images 
//     FROM products p
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     WHERE LOWER(REPLACE(p.Category, ' ', '')) = LOWER(REPLACE(?, ' ', ''))
//     ORDER BY p.CreatedAt DESC
//   `;

//   try {
//     const [results] = await db.query(query, [category]);

//     const parsed = results.map((row) => ({
//       ...row,
//       Images: (() => {
//         try {
//           const parsed = JSON.parse(row.Images);
//           return Array.isArray(parsed) ? parsed[0] : parsed;
//         } catch (e) {
//           return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
//         }
//       })(),
//     }));

//     res.json(parsed);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch products", error: err.message });
//   }
// };

// // ✅ Get product by ID
// exports.getProductById = async (req, res) => {
//   const { id } = req.params;
//   const query = `
//     SELECT p.*, pd.Description, pd.Fabric, pd.Fit, pd.Images, pd.Keywords
//     FROM products p
//     LEFT JOIN product_details pd ON p.PID = pd.PID
//     WHERE p.PID = ?
//   `;

//   try {
//     const [results] = await db.query(query, [id]);
//     if (results.length === 0) return res.status(404).json({ error: "Product not found" });

//     const row = results[0];
//     const image = (() => {
//       try {
//         const parsed = JSON.parse(row.Images);
//         return Array.isArray(parsed) ? parsed[0] : parsed;
//       } catch (e) {
//         return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
//       }
//     })();

//     res.json({ ...row, Images: image });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Get product reviews
// exports.getProductReviews = async (req, res) => {
//   const productId = req.params.id;
//   const query = "SELECT * FROM reviews WHERE PID = ?";

//   try {
//     const [results] = await db.query(query, [productId]);
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const db = require("../db");

// ✅ 1. Get All Products (for homepage or general listing)
exports.getAllProducts = async (req, res) => {
  const query = `
    SELECT 
  p.PID, 
  p.Name, 
  p.Price, 
  p.Category, 
  p.Brand, 
  p.ReviewSummary, 
  pd.Images
FROM products p
LEFT JOIN product_details pd ON p.PID = pd.PID
WHERE LOWER(p.Gender) = 'male' OR LOWER(pd.Gender) = 'male'
ORDER BY p.CreatedAt DESC`;

  

  try {
    const [results] = await db.query(query);
    const parsed = results.map((row) => ({
      ...row,
      Images: extractFirstImage(row.Images),
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// ✅ 2. Get Products by Category (e.g., Casual Shirts, etc.)
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const query = `

    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images

    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE LOWER(REPLACE(p.Category, ' ', '')) = LOWER(REPLACE(?, ' ', ''))
    ORDER BY p.CreatedAt DESC
  `;

  try {
    const [results] = await db.query(query, [category]);
    const parsed = results.map((row) => ({
      ...row,
      Images: extractFirstImage(row.Images),
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

exports.getWomenProducts = async (req, res) => {
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Brand, pd.Images, pd.Description, p.Category
    FROM products p
    JOIN product_details pd ON p.PID = pd.PID
    WHERE LOWER(p.Gender) = 'Female' OR LOWER(pd.Gender) = 'female'
    ORDER BY p.CreatedAt DESC
  `;

  try {
    const [products] = await db.query(query);
    const formatted = products.map(product => ({
      ...product,
      Images: Array.isArray(product.Images)
        ? product.Images[0]
        : typeof product.Images === "string" && product.Images.includes(",")
        ? product.Images.split(",")[0]
        : product.Images
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching women products:', error);
    res.status(500).json({ error: 'Failed to fetch women products' });
  }
};
// ✅ 3. Get Single Product Details by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary,
           pd.Description, pd.Fabric, pd.Fit, pd.Images, pd.Keywords
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE p.PID = ?
  `;

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found" });

    const row = results[0];
    res.json({ ...row, Images: extractFirstImage(row.Images) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 4. Get Reviews for a Product by Product ID
exports.getProductReviews = async (req, res) => {
  const productId = req.params.id;
  const query = `
    SELECT r.ReviewID, r.PID, r.UID, u.FirstName, u.LastName, r.Rating, r.Comment, r.CreatedAt
    FROM reviews r
    JOIN users u ON r.UID = u.UID
    WHERE r.PID = ?
    ORDER BY r.CreatedAt DESC
  `;

  try {
    const [results] = await db.query(query, [productId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Utility: Extract First Image from JSON or CSV string
function extractFirstImage(imagesField) {
  try {
    const parsed = JSON.parse(imagesField);
    return Array.isArray(parsed) ? parsed[0] : parsed;
  } catch (e) {
    return imagesField?.includes(",") ? imagesField.split(",")[0] : imagesField;
  }
}

