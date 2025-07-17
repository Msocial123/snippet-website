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

// ✅ Get All Products (Homepage or general listing)
exports.getAllProducts = async (req, res) => {
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.ReviewSummary, pd.Images
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    ORDER BY p.CreatedAt DESC
  `;

  try {
    const [results] = await db.query(query);

    const parsed = results.map((row) => ({
      ...row,
      Images: (() => {
        try {
          const parsed = JSON.parse(row.Images);
          return Array.isArray(parsed) ? parsed[0] : parsed;
        } catch (e) {
          return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
        }
      })(),
    }));

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// ✅ Get products by category (e.g., /api/products/category/formalshirts)
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
      Images: (() => {
        try {
          const parsed = JSON.parse(row.Images);
          return Array.isArray(parsed) ? parsed[0] : parsed;
        } catch (e) {
          return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
        }
      })(),
    }));

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// ✅ Get product by ID (e.g., for detailed product view)
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, pd.Description, pd.Fabric, pd.Fit, pd.Images, pd.Keywords
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE p.PID = ?
  `;

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found" });

    const row = results[0];

    const image = (() => {
      try {
        const parsed = JSON.parse(row.Images);
        return Array.isArray(parsed) ? parsed[0] : parsed;
      } catch (e) {
        return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
      }
    })();

    res.json({ ...row, Images: image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get reviews for a product
exports.getProductReviews = async (req, res) => {
  const productId = req.params.id;
  const query = "SELECT * FROM reviews WHERE PID = ?";

  try {
    const [results] = await db.query(query, [productId]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
