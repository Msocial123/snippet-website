const db = require('../db');
exports.searchSuggestions = async (req, res) => {
  const searchTerm = req.query.query; // renamed to avoid shadowing
  console.log("Incoming search query:", searchTerm);

  try {
    if (!searchTerm) return res.json([]);

    const [results] = await db.query(`
      SELECT 
        p.PID,
        p.Name,
        p.Category,
        p.Price,
        COALESCE(pd.Images, '') AS Images
      FROM products p
      JOIN product_details pd ON p.PID = pd.PID
      WHERE p.Name LIKE ? 
         OR COALESCE(pd.Keywords, '') LIKE ?
      ORDER BY 
        CASE 
          WHEN p.Name = ? THEN 0  -- Exact match
          WHEN p.Name LIKE ? THEN 1  -- Starts with
          WHEN p.Name LIKE ? THEN 2  -- Contains
          ELSE 3
        END,
        p.Name
      LIMIT 6
    `, [
      `%${searchTerm}%`, `%${searchTerm}%`,  // WHERE
      searchTerm, `${searchTerm}%`, `%${searchTerm}%`  // ORDER
    ]);

    console.log("Search results:", results);
    res.json(results);
  } catch (error) {
    console.error('❌ Search suggestions error:', error.message);
    res.status(500).json({ error: 'Failed to fetch suggestions', details: error.message });
  }
};

exports.getPopularSearches = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT query, COUNT(*) as count 
      FROM search_history
      WHERE timestamp > DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY query
      ORDER BY count DESC
      LIMIT 5
    `);
    res.json(results.map(r => r.query));
  } catch (error) {
    console.error('Popular searches error:', error);
    res.status(500).json({ error: 'Failed to fetch popular searches' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json({ products: [], categories: [] });
    }

    const [products, categories] = await Promise.all([
      db.query(`
        SELECT p.*, pd.Description, pd.Images 
        FROM products p
        JOIN product_details pd ON p.PID = pd.PID
        WHERE p.Name LIKE ? 
           OR p.Category LIKE ? 
           OR pd.Keywords LIKE ?
        LIMIT 20
      `, [`%${query}%`, `%${query}%`, `%${query}%`]),
      
      db.query(`
        SELECT Category, COUNT(*) as count 
        FROM products 
        WHERE Name LIKE ? OR Category LIKE ?
        GROUP BY Category
        ORDER BY count DESC
        LIMIT 5
      `, [`%${query}%`, `%${query}%`])
    ]);

    res.json({
      query,
      products: products[0],
      categories: categories[0]
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
};