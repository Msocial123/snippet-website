
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
  const navigate = useNavigate();

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length >= 2) { // Only search after 2+ characters
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_BASE}/api/search/suggest?query=${searchQuery}`
          );
          
          const formatted = response.data.map(product => ({
            ...product,
            Images: typeof product.Images === 'string' ? 
                   JSON.parse(product.Images) : product.Images
          }));
          
          setSuggestions(formatted);
          setShowSuggestions(true);
        } catch (error) {
          console.error('API Error:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timer);
  }, [searchQuery, API_BASE]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  
const IMAGE_BASE_URL = 'http://localhost:5000/uploads/';

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(e.target.value.length >= 2);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-icon-button">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {showSuggestions && (
        <div className="suggestions-dropdown">
          {isLoading ? (
            <div className="suggestion-loading">Loading...</div>
          ) : suggestions.length > 0 ? (
            <>
              <div className="search-query-header">
                Results for "{searchQuery}"
              </div>
              {suggestions.map((product) => (
                <div
                  key={product.PID}
                  className="suggestion-item"
                  onClick={() => {
                    navigate(`/product/${product.PID}`);
                    setShowSuggestions(false);
                  }}
                >
                  {product.Images?.[0] && (
                   
                    <img
  src={Array.isArray(product.Images) ? IMAGE_BASE_URL + product.Images[0] : IMAGE_BASE_URL + product.Images}
  alt={product.Name}
  className="suggestion-image"
  onError={e => { e.target.src = '/images/placeholder.jpg'; }}
/>
                  )}
                  <div className="suggestion-details">
                    <div className="product-name">{product.Name}</div>
                    <div className="product-price">₹{product.Price}</div>
                  </div>
                </div>
              ))}
            </>
          ) : searchQuery.length >= 2 ? (
            <div className="suggestion-empty">
              No results found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;