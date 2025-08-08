const db = require("../db");
// ✅ Get all variants for a product ID
exports.getVariantsByProductId = async (req, res) => {
  const { pid } = req.query;

  try {
    const [rows] = await db.query("SELECT * FROM product_variants WHERE PID = ?", [pid]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No variants found for this product ID" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
;


exports.getVariantByAttributes = async (req, res) => {
  const { pid, color, size } = req.query;

  console.log("Incoming query:", { pid, color, size });

  try {
    const [rows] = await db.query(
      `
      SELECT * FROM product_variants
      WHERE PID = ?
        AND LOWER(TRIM(Color)) = LOWER(TRIM(?))
        AND LOWER(TRIM(Size)) = LOWER(TRIM(?))
      `,
      [pid, color, size]
    );

    console.log("Query result:", rows);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching variant by attributes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

