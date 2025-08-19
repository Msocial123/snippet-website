import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
  
  const [results, setResults] = useState({
    products: [],
    categories: [],
    loading: true,
    error: null
  });

  // Add this FIRST - Route validation
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (!query) {
      navigate('/');
      return;
    }
  }, [location.search, navigate]);

useEffect(() => {
  // If we already have results from navigation state, use them
  if (location.state?.searchData) {
    setResults({
      products: location.state.searchData.products || [],
      categories: location.state.searchData.categories || [],
      loading: false,
      error: null
    });
  } 
  // Otherwise fetch from API
  else if (query) {
    setResults(prev => ({ ...prev, loading: true }));
    axios.get(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`)
      .then(response => {
        setResults({
          products: response.data.products || [],
          categories: response.data.categories || [],
          loading: false,
          error: null
        });
      })
      .catch(error => {
        console.error('Search results error:', error);
        setResults({
          products: [],
          categories: [],
          loading: false,
          error: "Failed to load search results"
        });
      });
  }
}, [query, API_BASE, location.state]);

  if (results.loading) return <div className="loading-spinner">Loading...</div>;
  if (results.error) return <div className="error-message">{results.error}</div>;

  return (
    <div className="search-results-page">
      <div className="search-header">
        <h1>Results for "{query}"</h1>
        <p>{results.products.length} products found</p>
      </div>

      <div className="search-content">
        {results.categories.length > 0 && (
          <div className="category-filters">
            <h3>Popular Categories</h3>
            <div className="category-tags">
              {results.categories.map(cat => (
                <button 
                  key={cat.Category}
                  onClick={() => navigate(`/category/${cat.Category}`)}
                  className="category-tag"
                >
                  {cat.Category} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-grid">
          {results.products.map(product => (
            <ProductCard 
              key={product.PID} 
              product={product} 
              className="search-product-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;