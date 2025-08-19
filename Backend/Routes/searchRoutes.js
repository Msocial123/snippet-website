const express = require('express');
const router = express.Router();
const searchController = require('../Controller/searchController');

// router.get('/suggest', searchController.searchSuggestions);
// router.get('/', searchController.searchProducts);
// router.get('/search/suggest', searchController.searchSuggestions);
// router.get('/search/popular', searchController.getPopularSearches);

router.get('/suggest', searchController.searchSuggestions);
router.get('/popular', searchController.getPopularSearches);
router.get('/', searchController.searchProducts);

module.exports = router;