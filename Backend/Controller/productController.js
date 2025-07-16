const db = require("../db");

exports.getAllProducts = (req, res) => {
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.StockQuantity, pd.Images 
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    ORDER BY p.CreatedAt DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch products", error: err.message });

    const parsed = results.map((row) => ({
      ...row,
      Images: (() => {
        try {
          const parsed = JSON.parse(row.Images);
          return Array.isArray(parsed) ? parsed[0] : null;
        } catch (e) {
          return row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
        }
      })(),
    }));

    res.json(parsed);
  });
};

exports.getProductsByCategory = (req, res) => {
  const { category } = req.params;
  const query = `
    SELECT p.PID, p.Name, p.Price, p.Category, p.Brand, p.StockQuantity, pd.Images 
    FROM products p
    LEFT JOIN product_details pd ON p.PID = pd.PID
    WHERE p.Category = ?
    ORDER BY p.CreatedAt DESC
  `;

  db.query(query, [category], (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch products", error: err.message });

    const parsed = results.map((row) => {
      let image = null;
      if (Array.isArray(row.Images)) {
        image = row.Images[0];
      } else if (typeof row.Images === "string") {
        try {
          const parsed = JSON.parse(row.Images);
          image = Array.isArray(parsed) ? parsed[0] : parsed;
        } catch {
          image = row.Images.includes(",") ? row.Images.split(",")[0] : row.Images;
        }
      } else if (Buffer.isBuffer(row.Images)) {
        const str = row.Images.toString("utf-8");
        try {
          const parsed = JSON.parse(str);
          image = Array.isArray(parsed) ? parsed[0] : parsed;
        } catch {
          image = str.includes(",") ? str.split(",")[0] : str;
        }
      }

      return {
        ...row,
        Images: image,
      };
    });

    res.json(parsed);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, pd.Images 
    FROM products p 
    LEFT JOIN product_details pd ON p.PID = pd.PID 
    WHERE p.PID = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });

    const row = results[0];
    let image = null;

    try {
      const parsed = JSON.parse(row.Images);
      image = Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      image = row.Images?.includes(",") ? row.Images.split(",")[0] : row.Images;
    }

    res.json({ ...row, Images: image });
  });
};

exports.getProductReviews = (req, res) => {
  const productId = req.params.id;

  db.query("SELECT * FROM reviews WHERE PID = ?", [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
