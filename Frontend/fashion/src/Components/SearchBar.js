// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import axios from "axios";
// // // // // // import "./SearchBar.css";

// // // // // // const SearchBar = () => {
// // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // //   const [suggestions, setSuggestions] = useState([]);
// // // // // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const navigate = useNavigate();
// // // // // //   const searchRef = useRef(null);
// // // // // //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

// // // // // //   // Handle click outside
// // // // // //   useEffect(() => {
// // // // // //     const handleClickOutside = (e) => {
// // // // // //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// // // // // //         setShowSuggestions(false);
// // // // // //       }
// // // // // //     };
// // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // //   }, []);

// // // // // //   // Fetch suggestions
// // // // // //   useEffect(() => {
// // // // // //     const fetchSuggestions = async () => {
// // // // // //       if (searchQuery.length > 0) {
// // // // // //         setIsLoading(true);
// // // // // //         try {
// // // // // //             console.log("Fetching for:", searchQuery); // Debug 1
// // // // // //           const response = await axios.get(
// // // // // //             `${API_BASE}/api/search/suggest?query=${searchQuery}`
// // // // // //           );
// // // // // //           console.log("Received:", response.data); 
// // // // // //           setSuggestions(response.data || []);
// // // // // //           setShowSuggestions(true);
// // // // // //         } catch (error) {
// // // // // //         //   console.error('Search error:', error);
// // // // // //         console.error('Error:', error.response || error);
// // // // // //           setSuggestions([]);
// // // // // //         } finally {
// // // // // //           setIsLoading(false);
// // // // // //         }
// // // // // //       } else {
// // // // // //         setSuggestions([]);
// // // // // //       }
// // // // // //     };

// // // // // //     const timer = setTimeout(fetchSuggestions, 300);
// // // // // //     return () => clearTimeout(timer);
// // // // // //   }, [searchQuery]);

// // // // // //   const handleSearchSubmit = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (searchQuery.trim()) {
// // // // // //       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// // // // // //       setSearchQuery("");
// // // // // //       setShowSuggestions(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSuggestionClick = (product) => {
// // // // // //     navigate(`/product/${product.PID}`);
// // // // // //     setSearchQuery("");
// // // // // //     setShowSuggestions(false);
// // // // // //   };

// // // // // //   // Helper for ordinal numbers (1st, 2nd, etc.)
// // // // // //   const getOrdinalSuffix = (num) => {
// // // // // //     const j = num % 10, k = num % 100;
// // // // // //     if (j === 1 && k !== 11) return 'st';
// // // // // //     if (j === 2 && k !== 12) return 'nd';
// // // // // //     if (j === 3 && k !== 13) return 'rd';
// // // // // //     return 'th';
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="search-container" ref={searchRef}>
// // // // // //       <form onSubmit={handleSearchSubmit} className="search-form">
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Search for Products, Brands and More"
// // // // // //           value={searchQuery}
// // // // // //           onChange={(e) => {
// // // // // //             setSearchQuery(e.target.value);
// // // // // //             setShowSuggestions(true);
// // // // // //           }}
// // // // // //           onFocus={() => setShowSuggestions(true)}
// // // // // //           className="search-input"
// // // // // //           aria-label="Search products"
// // // // // //         />
// // // // // //         <button type="submit" className="search-icon-button">
// // // // // //           <i className="fas fa-search"></i>
// // // // // //         </button>
// // // // // //       </form>

// // // // // //       {showSuggestions && (isLoading || suggestions.length > 0) && (
// // // // // //   <div className="suggestions-dropdown">
// // // // // //     {isLoading ? (
// // // // // //       <div className="suggestion-loading">Loading...</div>
// // // // // //     ) : suggestions.length > 0 ? (
// // // // // //       <>
// // // // // //         <div className="search-query-header">
// // // // // //           Showing results for "{searchQuery}"
// // // // // //         </div>
// // // // // //         {suggestions.map((product, index) => (
// // // // // //           <div
// // // // // //             key={product.PID}
// // // // // //             className="suggestion-item"
// // // // // //             onClick={() => handleSuggestionClick(product)}
// // // // // //           >
// // // // // //             <div className="suggestion-rank">
// // // // // //               {index + 1}{getOrdinalSuffix(index + 1)}
// // // // // //             </div>
// // // // // //             {product.Images && (
// // // // // //               <img
// // // // // //                 src={product.Images.split(",")[0]} 
// // // // // //                 alt={product.Name}
// // // // // //                 className="suggestion-image"
// // // // // //               />
// // // // // //             )}
// // // // // //             <div className="suggestion-content">
// // // // // //               <div className="product-name">
// // // // // //                 {product.Name}
// // // // // //                 {product.Weight && (
// // // // // //                   <span className="product-weight"> - {product.Weight}</span>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //               <div className="product-prices">
// // // // // //                 <span className="discounted-price">
// // // // // //                   ₹{product.DiscountedPrice || product.Price}
// // // // // //                 </span>
// // // // // //                 {product.Price > (product.DiscountedPrice || 0) && (
// // // // // //                   <span className="original-price">
// // // // // //                     ₹{product.Price}
// // // // // //                   </span>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </>
// // // // // //     ) : (
// // // // // //       <div className="suggestion-empty">
// // // // // //         No results found for "{searchQuery}"
// // // // // //       </div>
// // // // // //     )}
// // // // // //   </div>
// // // // // // )}

// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SearchBar;

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import axios from "axios";
// // // // // import "./SearchBar.css";

// // // // // const SearchBar = () => {
// // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // //   const [suggestions, setSuggestions] = useState([]);
// // // // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
// // // // //   const [recentSearches, setRecentSearches] = useState([]);
// // // // //   const [popularSearches, setPopularSearches] = useState([]);
  
// // // // //   const navigate = useNavigate();
// // // // //   const searchRef = useRef(null);
// // // // //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
// // // // // const [dropdownStyle, setDropdownStyle] = useState({});

// // // // // useEffect(() => {
// // // // //   if (!showSuggestions) return;
// // // // //   const inputEl = searchRef.current?.querySelector('.search-input');
// // // // //   if (!inputEl) return;

// // // // //   const rect = inputEl.getBoundingClientRect();
// // // // //   setDropdownStyle({
// // // // //     position: 'fixed',
// // // // //     top: `${rect.bottom + 4}px`,
// // // // //     left: `${rect.left}px`,
// // // // //     width: `${rect.width}px`,
// // // // //     zIndex: 100000,         // above headers
// // // // //     maxHeight: '400px',
// // // // //   });
// // // // // }, [showSuggestions, searchQuery]);

// // // // //   // Load recent searches and popular searches on mount
// // // // //   useEffect(() => {
// // // // //     const saved = localStorage.getItem('recentSearches');
// // // // //     if (saved) setRecentSearches(JSON.parse(saved));
    
// // // // //     const fetchPopularSearches = async () => {
// // // // //       try {
// // // // //         const response = await axios.get(`${API_BASE}/api/search/popular`);
// // // // //         setPopularSearches(response.data);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching popular searches:', error);
// // // // //       }
// // // // //     };
// // // // //     fetchPopularSearches();
// // // // //   }, [API_BASE]);

// // // // //   // Save recent searches when updated
// // // // //   useEffect(() => {
// // // // //     localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
// // // // //   }, [recentSearches]);

// // // // //   // Handle click outside
// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (e) => {
// // // // //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// // // // //         setShowSuggestions(false);
// // // // //       }
// // // // //     };
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   // Fetch suggestions
// // // // //   useEffect(() => {
// // // // //     const fetchSuggestions = async () => {
// // // // //       if (searchQuery.trim().length >= 1) {
// // // // //         setIsLoading(true);
// // // // //         try {
// // // // //           const response = await axios.get(`${API_BASE}/api/search/suggest?query=${searchQuery}`
            
// // // // //           );
// // // // //            setSuggestions(response.data);   // suggestions only, not full product list
// // // // //     setShowSuggestions(true);
// // // // //           // setSuggestions(response.data || []);
// // // // //           // setShowSuggestions(true);
// // // // //           setSelectedSuggestion(-1); // Reset selection when new results come
// // // // //         // inside the suggestions fetch try{}
// // // // // console.log('[suggestions]', response.data);

// // // // // // right before the return in SearchBar
// // // // // console.log('[ui]', { showSuggestions, query: searchQuery, count: suggestions.length });

// // // // //         } catch (error) {
// // // // //           console.error('Error:', error.response || error);
// // // // //           setSuggestions([]);
// // // // //         } finally {
// // // // //           setIsLoading(false);
// // // // //         }
// // // // //       } else {
// // // // //         setSuggestions([]);
// // // // //       }
// // // // //     };

// // // // //     const timer = setTimeout(fetchSuggestions, 200);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [searchQuery, API_BASE]);

// // // // //   // Highlight matching text in suggestions
// // // // //   const highlightMatch = (text, query) => {
// // // // //     if (!query) return text;
// // // // //     const regex = new RegExp(`(${query})`, 'gi');
// // // // //     return text.split(regex).map((part, i) => 
// // // // //       part.toLowerCase() === query.toLowerCase() ? 
// // // // //         <span key={i} className="highlight">{part}</span> : 
// // // // //         part
// // // // //     );
// // // // //   };

// // // // //   // Keyboard navigation
// // // // //   const handleKeyDown = (e) => {
// // // // //     if (e.key === 'ArrowDown') {
// // // // //       e.preventDefault();
// // // // //       setSelectedSuggestion(prev => 
// // // // //         Math.min(prev + 1, suggestions.length - 1)
// // // // //       );
// // // // //     } else if (e.key === 'ArrowUp') {
// // // // //       e.preventDefault();
// // // // //       setSelectedSuggestion(prev => Math.max(prev - 1, -1));
// // // // //     } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
// // // // //       e.preventDefault();
// // // // //       handleSuggestionClick(suggestions[selectedSuggestion]);
// // // // //     }
// // // // //   };

// // // // //   // Add this right before handleSearchSubmit
// // // // // const handleInputChange = (e) => {
// // // // //   const value = e.target.value;
// // // // //   setSearchQuery(value);
// // // // //   // Always show suggestions when typing
// // // // //   setShowSuggestions(true);
// // // // //   // Reset selection
// // // // //   setSelectedSuggestion(-1);
// // // // // };

// // // // //   const handleSearchSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     const trimmedQuery = searchQuery.trim();
// // // // //     if (trimmedQuery) {
// // // // //       // Add to recent searches (max 5)
// // // // //       setRecentSearches(prev => 
// // // // //         [trimmedQuery, ...prev.filter(q => q !== trimmedQuery)].slice(0, 5)
// // // // //       );
// // // // //       navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
// // // // //       setSearchQuery("");
// // // // //       setShowSuggestions(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSuggestionClick = (product) => {
// // // // //     navigate(`/product/${product.PID}`);
// // // // //     setSearchQuery("");
// // // // //     setShowSuggestions(false);
// // // // //   };

// // // // //   const getOrdinalSuffix = (num) => {
// // // // //     const j = num % 10, k = num % 100;
// // // // //     if (j === 1 && k !== 11) return 'st';
// // // // //     if (j === 2 && k !== 12) return 'nd';
// // // // //     if (j === 3 && k !== 13) return 'rd';
// // // // //     return 'th';
// // // // //   };
// // // // // console.log('[ui]', { showSuggestions, query: searchQuery, count: suggestions.length });

// // // // //  // 👇 Debugging logs: put this here
// // // // //   useEffect(() => {
// // // // //     console.log("Search Query:", searchQuery);
// // // // //     console.log("Suggestions:", suggestions);
// // // // //   }, [searchQuery, suggestions]);
  
// // // // //   return (
// // // // //     <div className="search-container" ref={searchRef}>
// // // // //       <form onSubmit={handleSearchSubmit} className="search-form">
// // // // //         {/* <input
// // // // //           type="text"
// // // // //           placeholder="Search for Products, Brands and More"
// // // // //           value={searchQuery}
// // // // //           onChange={(e) => {
// // // // //             setSearchQuery(e.target.value);
// // // // //             setShowSuggestions(true);
// // // // //           }}
// // // // //           onFocus={() => setShowSuggestions(true)}
// // // // //           onKeyDown={handleKeyDown}
// // // // //           className="search-input"
// // // // //           aria-label="Search products"
// // // // //           autoComplete="off"
// // // // //         /> */}

// // // // //         <input
// // // // //   type="text"
// // // // //   placeholder="Search for Products, Brands and More"
// // // // //   value={searchQuery}
// // // // //   onChange={handleInputChange}  // Changed from inline function to handleInputChange
// // // // //   onFocus={() => setShowSuggestions(true)}
// // // // //   onKeyDown={handleKeyDown}
// // // // //   className="search-input"
// // // // //   aria-label="Search products"
// // // // //   autoComplete="off"
// // // // // />
// // // // //         <button type="submit" className="search-icon-button">
// // // // //           <i className="fas fa-search"></i>
// // // // //         </button>
// // // // //       </form>

// // // // //       {/* SUGGESTIONS DROPDOWN - MAIN CHANGES HERE */}
// // // // //       {showSuggestions && (
// // // // //         <div className="suggestions-dropdown" style={dropdownStyle}>
// // // // //           {/* When search query is empty, show recent/popular searches */}
// // // // //           {searchQuery.length === 0 ? (
// // // // //             <>
// // // // //               {recentSearches.length > 0 && (
// // // // //                 <div className="suggestions-section">
// // // // //                   <div className="suggestions-header">Recent Searches</div>
// // // // //                   {recentSearches.map((search, index) => (
// // // // //                     <div 
// // // // //                       key={`recent-${index}`}
// // // // //                       className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
// // // // //                       onClick={() => {
// // // // //                         setSearchQuery(search);
// // // // //                         navigate(`/search?query=${encodeURIComponent(search)}`);
// // // // //                       }}
// // // // //                     >
// // // // //                       <i className="fas fa-history"></i>
// // // // //                       <span>{search}</span>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //               {popularSearches.length > 0 && (
// // // // //                 <div className="suggestions-section">
// // // // //                   <div className="suggestions-header">Popular Searches</div>
// // // // //                   {popularSearches.map((search, index) => (
// // // // //                     <div 
// // // // //                       key={`popular-${index}`}
// // // // //                       className={`suggestion-item ${index + recentSearches.length === selectedSuggestion ? 'selected' : ''}`}
// // // // //                       onClick={() => {
// // // // //                         setSearchQuery(search);
// // // // //                         navigate(`/search?query=${encodeURIComponent(search)}`);
// // // // //                       }}
// // // // //                     >
// // // // //                       <i className="fas fa-fire"></i>
// // // // //                       <span>{search}</span>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </>
// // // // //           ) : isLoading ? (
// // // // //             <div className="suggestion-loading">Loading...</div>
// // // // //           ) : suggestions.length > 0 ? (
// // // // //             <>
// // // // //               <div className="search-query-header">
// // // // //                 Showing results for "{searchQuery}"
// // // // //               </div>
// // // // //               {suggestions.map((product, index) => (
// // // // //                 <div
// // // // //                   key={product.PID}
// // // // //                   className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
// // // // //                   onClick={() => handleSuggestionClick(product)}
// // // // //                 >
// // // // //                   <div className="suggestion-rank">
// // // // //                     {index + 1}{getOrdinalSuffix(index + 1)}
// // // // //                   </div>
// // // // //                   {product.Images && (
// // // // //                     <img
// // // // //                       src={product.Images.split(",")[0]} 
// // // // //                       alt={product.Name}
// // // // //                       className="suggestion-image"
// // // // //                     />
// // // // //                   )}
// // // // //                   <div className="suggestion-content">
// // // // //                     <div className="product-name">
// // // // //                       {highlightMatch(product.Name, searchQuery)}
// // // // //                       {product.Weight && (
// // // // //                         <span className="product-weight"> - {product.Weight}</span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                     <div className="product-prices">
// // // // //                       <span className="discounted-price">
// // // // //                         ₹{product.DiscountedPrice || product.Price}
// // // // //                       </span>
// // // // //                       {product.Price > (product.DiscountedPrice || 0) && (
// // // // //                         <span className="original-price">
// // // // //                           ₹{product.Price}
// // // // //                         </span>
// // // // //                       )}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </>
// // // // //           ) : (
// // // // //             <div className="suggestion-empty">
// // // // //               No results found for "{searchQuery}"
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SearchBar;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SearchBar.css";

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
  
//   const navigate = useNavigate();
//   const searchRef = useRef(null);
//   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

//   useEffect(() => {
//   console.log("Search Query:", searchQuery);
//   console.log("Suggestions:", suggestions);
// }, [searchQuery, suggestions]);

//   // Load recent searches and popular searches on mount
//   useEffect(() => {
//     const saved = localStorage.getItem('recentSearches');
//     if (saved) setRecentSearches(JSON.parse(saved));
    
//     const fetchPopularSearches = async () => {
//       try {
//         const response = await axios.get(`${API_BASE}/api/search/popular`);
//         setPopularSearches(response.data);
//       } catch (error) {
//         console.error('Error fetching popular searches:', error);
//       }
//     };
//     fetchPopularSearches();
//   }, [API_BASE]);

//   // Save recent searches when updated
//   useEffect(() => {
//     localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//   }, [recentSearches]);

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Add at the top of your component
// console.log("Rendering SearchBar", {
//   searchQuery,
//   showSuggestions,
//   suggestions: suggestions.length,
//   isLoading
// });

//   // Fetch suggestions
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchQuery.trim().length >= 1) {
//         setIsLoading(true);
//         try {
//           console.log('Fetching suggestions for:', searchQuery);
//           const response = await axios.get(
//             `${API_BASE}/api/search/suggest?query=${searchQuery}`
//           );
//           console.log('API response:', response.data);
//           setSuggestions(response.data || []);
//           setShowSuggestions(true);
//           setSelectedSuggestion(-1);
//         } catch (error) {
//           console.error('Error:', error);
//           setSuggestions([]);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setSuggestions([]);
//       }
//     };

//     const timer = setTimeout(fetchSuggestions, 200);
//     return () => clearTimeout(timer);
//   }, [searchQuery, API_BASE]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     setShowSuggestions(true);
//     setSelectedSuggestion(-1);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const trimmedQuery = searchQuery.trim();
//     if (trimmedQuery) {
//       setRecentSearches(prev => 
//         [trimmedQuery, ...prev.filter(q => q !== trimmedQuery)].slice(0, 5)
//       );
//       navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//     }
//   };

//   const handleSuggestionClick = (product) => {
//     navigate(`/product/${product.PID}`);
//     setSearchQuery("");
//     setShowSuggestions(false);
//   };

//   const getOrdinalSuffix = (num) => {
//     const j = num % 10, k = num % 100;
//     if (j === 1 && k !== 11) return 'st';
//     if (j === 2 && k !== 12) return 'nd';
//     if (j === 3 && k !== 13) return 'rd';
//     return 'th';
//   };

//   return (
//     <div className="search-container" ref={searchRef}>
//       <form onSubmit={handleSearchSubmit} className="search-form">
//         <input
//           type="text"
//           placeholder="Search for Products, Brands and More"
//           value={searchQuery}
//           onChange={handleInputChange}
//           onFocus={() => setShowSuggestions(true)}
//           onKeyDown={(e) => {
//             if (e.key === 'ArrowDown') {
//               e.preventDefault();
//               setSelectedSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
//             } else if (e.key === 'ArrowUp') {
//               e.preventDefault();
//               setSelectedSuggestion(prev => Math.max(prev - 1, -1));
//             } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
//               e.preventDefault();
//               handleSuggestionClick(suggestions[selectedSuggestion]);
//             }
//           }}
//           className="search-input"
//           aria-label="Search products"
//           autoComplete="off"
//         />
//         <button type="submit" className="search-icon-button">
//           <i className="fas fa-search"></i>
//         </button>
//       </form>

//       {showSuggestions && (
//         <div className="suggestions-dropdown">
//           {searchQuery.length === 0 ? (
//             <>
//               {recentSearches.length > 0 && (
//                 <div className="suggestions-section">
//                   <div className="suggestions-header">Recent Searches</div>
//                   {recentSearches.map((search, index) => (
//                     <div 
//                       key={`recent-${index}`}
//                       className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
//                       onClick={() => {
//                         setSearchQuery(search);
//                         navigate(`/search?query=${encodeURIComponent(search)}`);
//                       }}
//                     >
//                       <i className="fas fa-history"></i>
//                       <span>{search}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {popularSearches.length > 0 && (
//                 <div className="suggestions-section">
//                   <div className="suggestions-header">Popular Searches</div>
//                   {popularSearches.map((search, index) => (
//                     <div 
//                       key={`popular-${index}`}
//                       className={`suggestion-item ${index + recentSearches.length === selectedSuggestion ? 'selected' : ''}`}
//                       onClick={() => {
//                         setSearchQuery(search);
//                         navigate(`/search?query=${encodeURIComponent(search)}`);
//                       }}
//                     >
//                       <i className="fas fa-fire"></i>
//                       <span>{search}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           ) : isLoading ? (
//             <div className="suggestion-loading">Loading...</div>
//           ) : suggestions.length > 0 ? (
//             <>
//               <div className="search-query-header">
//                 Showing results for "{searchQuery}"
//               </div>
//               {suggestions.map((product, index) => (
//                 <div
//                   key={product.PID}
//                   className={`suggestion-item ${index === selectedSuggestion ? 'selected' : ''}`}
//                   onClick={() => handleSuggestionClick(product)}
//                 >
//                   <div className="suggestion-rank">
//                     {index + 1}{getOrdinalSuffix(index + 1)}
//                   </div>
//                   {/* {product.Images && (
//                     <img
//                       src={product.Images.split(",")[0]} 
//                       alt={product.Name}
//                       className="suggestion-image"
//                     />
//                   )} */}
//                   {product.Images && (() => {
//   let firstImage = "";
//   try {
//     const parsed = JSON.parse(product.Images);
//     if (Array.isArray(parsed) && parsed.length > 0) {
//       firstImage = parsed[0];
//     }
//   } catch {
//     firstImage = product.Images.split(",")[0];
//   }
//   return (
//     <img
//       src={firstImage}
//       alt={product.Name}
//       className="suggestion-img"
//     />
//   );
// })()}

//                   <div className="suggestion-content">
//                     <div className="product-name">
//                       {product.Name}
//                       {product.Weight && (
//                         <span className="product-weight"> - {product.Weight}</span>
//                       )}
//                     </div>
//                     <div className="product-prices">
//                       <span className="discounted-price">
//                         ₹{product.DiscountedPrice || product.Price}
//                       </span>
//                       {product.Price > (product.DiscountedPrice || 0) && (
//                         <span className="original-price">
//                           ₹{product.Price}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="suggestion-empty">
//               No results found for "{searchQuery}"
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import "./SearchBar.css";

// // // const SearchBar = () => {
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [suggestions, setSuggestions] = useState([]);
// // //   const [showSuggestions, setShowSuggestions] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const searchRef = useRef(null);
// // //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
// // //   const navigate = useNavigate();

// // //   // Fetch suggestions
// // //   useEffect(() => {
// // //     const fetchSuggestions = async () => {
// // //       if (searchQuery.trim().length >= 1) {
// // //         setIsLoading(true);
// // //         try {
// // //           const response = await axios.get(
// // //             `${API_BASE}/api/search/suggest?query=${searchQuery}`
// // //           );
          
// // //           // Parse the Images field properly
// // //           const formattedSuggestions = response.data.map(product => ({
// // //             ...product,
// // //             Images: JSON.parse(product.Images) // Parse the JSON string
// // //           }));
          
// // //           setSuggestions(formattedSuggestions);
// // //           setShowSuggestions(true);
// // //         } catch (error) {
// // //           console.error('Error fetching suggestions:', error);
// // //           setSuggestions([]);
// // //         } finally {
// // //           setIsLoading(false);
// // //         }
// // //       } else {
// // //         setSuggestions([]);
// // //       }
// // //     };

// // //     const timer = setTimeout(fetchSuggestions, 300);
// // //     return () => clearTimeout(timer);
// // //   }, [searchQuery, API_BASE]);

// // //   // Handle click outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// // //         setShowSuggestions(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     setSearchQuery(e.target.value);
// // //     setShowSuggestions(true);
// // //   };

// // //   const handleSearchSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (searchQuery.trim()) {
// // //       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// // //       setSearchQuery("");
// // //       setShowSuggestions(false);
// // //     }
// // //   };

// // //   const handleSuggestionClick = (product) => {
// // //     navigate(`/product/${product.PID}`);
// // //     setSearchQuery("");
// // //     setShowSuggestions(false);
// // //   };

// // //   // Add at the top of your component's return statement
// // // console.log("Debug Info:", {
// // //   showSuggestions,
// // //   searchQuery,
// // //   suggestions: suggestions.length,
// // //   isLoading,
// // //   apiBase: API_BASE
// // // });

// // //   return (
// // //     <div className="search-container" ref={searchRef}>
// // //       <form onSubmit={handleSearchSubmit} className="search-form">
// // //         <input
// // //           type="text"
// // //           placeholder="Search for Products, Brands and More"
// // //           value={searchQuery}
// // //           onChange={handleInputChange}
// // //           onFocus={() => setShowSuggestions(true)}
// // //           className="search-input"
// // //           autoComplete="off"
// // //         />
// // //         <button type="submit" className="search-icon-button">
// // //           <i className="fas fa-search"></i>
// // //         </button>
// // //       </form>

// // //       {showSuggestions && (
// // //         <div className="suggestions-dropdown">
// // //           {isLoading ? (
// // //             <div className="suggestion-loading">Loading...</div>
// // //           ) : suggestions.length > 0 ? (
// // //             <>
// // //               <div className="search-query-header">
// // //                 Results for "{searchQuery}"
// // //               </div>
// // //               {suggestions.map((product) => (
// // //                 <div
// // //                   key={product.PID}
// // //                   className="suggestion-item"
// // //                   onClick={() => handleSuggestionClick(product)}
// // //                 >
// // //                   {product.Images && product.Images.length > 0 && (
// // //                     <img
// // //                       src={product.Images[0]}
// // //                       alt={product.Name}
// // //                       className="suggestion-image"
// // //                     />
// // //                   )}
// // //                   <div className="suggestion-details">
// // //                     <div className="product-name">{product.Name}</div>
// // //                     <div className="product-price">₹{product.Price}</div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </>
// // //           ) : searchQuery.length > 0 ? (
// // //             <div className="suggestion-empty">
// // //               No results found for "{searchQuery}"
// // //             </div>
// // //           ) : null}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SearchBar;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./SearchBar.css";

// // const SearchBar = () => {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const searchRef = useRef(null);
// //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       if (searchQuery.trim().length >= 1) {
// //         setIsLoading(true);
// //         try {
// //           const response = await axios.get(
// //             `${API_BASE}/api/search/suggest?query=${searchQuery}`
// //           );
          
// //           // Process the API response
// //           const formatted = response.data.map(product => ({
// //             ...product,
// //             Images: typeof product.Images === 'string' ? 
// //                    JSON.parse(product.Images.replace(/\\"/g, '"')) : 
// //                    product.Images
// //           }));
          
// //           setSuggestions(formatted);
// //           setShowSuggestions(true);
// //         } catch (error) {
// //           console.error('API Error:', error);
// //           setSuggestions([]);
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setSuggestions([]);
// //       }
// //     };

// //     const timer = setTimeout(fetchSuggestions, 300);
// //     return () => clearTimeout(timer);
// //   }, [searchQuery, API_BASE]);

// //   // Handle click outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setSearchQuery(e.target.value);
// //     setShowSuggestions(true);
// //   };

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// //       setSearchQuery("");
// //       setShowSuggestions(false);
// //     }
// //   };

// //   const handleSuggestionClick = (product) => {
// //     navigate(`/product/${product.PID}`);
// //     setSearchQuery("");
// //     setShowSuggestions(false);
// //   };

// //   return (
// //     <div className="search-container" ref={searchRef}>
// //       <form onSubmit={handleSearchSubmit} className="search-form">
// //         <input
// //           type="text"
// //           placeholder="Search for Products, Brands and More"
// //           value={searchQuery}
// //           onChange={handleInputChange}
// //           onFocus={() => setShowSuggestions(true)}
// //           className="search-input"
// //           autoComplete="off"
// //         />
// //         <button type="submit" className="search-icon-button">
// //           <i className="fas fa-search"></i>
// //         </button>
// //       </form>

// //       {showSuggestions && (
// //         <div className="suggestions-dropdown">
// //           {isLoading ? (
// //             <div className="suggestion-loading">Loading...</div>
// //           ) : suggestions.length > 0 ? (
// //             <>
// //               <div className="search-query-header">
// //                 Results for "{searchQuery}"
// //               </div>
// //               {suggestions.map((product) => (
// //                 <div
// //                   key={product.PID}
// //                   className="suggestion-item"
// //                   onClick={() => handleSuggestionClick(product)}
// //                 >
// //                   {product.Images && product.Images.length > 0 && (
// //                     <img
// //                       src={`/images/${product.Images[0]}`}
// //                       alt={product.Name}
// //                       className="suggestion-image"
// //                       onError={(e) => {
// //                         e.target.src = '/images/placeholder.jpg'; // fallback image
// //                       }}
// //                     />
// //                   )}
// //                   <div className="suggestion-details">
// //                     <div className="product-name">{product.Name}</div>
// //                     <div className="product-category">{product.Category}</div>
// //                     <div className="product-price">₹{product.Price}</div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </>
// //           ) : searchQuery.length > 0 ? (
// //             <div className="suggestion-empty">
// //               No results found for "{searchQuery}"
// //             </div>
// //           ) : null}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchBar;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./SearchBar.css";

// // const SearchBar = () => {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const searchRef = useRef(null);
// //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
// //   const navigate = useNavigate();

// //   // Debug state
// //   console.log("Current state:", {
// //     query: searchQuery,
// //     showDropdown: showSuggestions,
// //     suggestionCount: suggestions.length,
// //     loading: isLoading
// //   });

// //   useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       if (searchQuery.trim().length >= 2) { // Changed to 2 characters minimum
// //         setIsLoading(true);
// //         try {
// //           const response = await axios.get(
// //             `${API_BASE}/api/search/suggest?query=${searchQuery}`
// //           );
          
// //           const formatted = response.data.map(product => ({
// //             ...product,
// //             Images: typeof product.Images === 'string' ? 
// //                    JSON.parse(product.Images) : product.Images
// //           }));
          
// //           setSuggestions(formatted);
// //           setShowSuggestions(true);
// //         } catch (error) {
// //           console.error('API Error:', error);
// //           setSuggestions([]);
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setSuggestions([]);
// //         setShowSuggestions(false);
// //       }
// //     };

// //     const timer = setTimeout(fetchSuggestions, 300);
// //     return () => clearTimeout(timer);
// //   }, [searchQuery, API_BASE]);

// //   // Click outside handler
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div className="search-container" ref={searchRef}>
// //       <form onSubmit={(e) => {
// //         e.preventDefault();
// //         if (searchQuery.trim()) {
// //           navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// //           setShowSuggestions(false);
// //         }
// //       }}>
// //         <input
// //           type="text"
// //           placeholder="Search for Products, Brands and More"
// //           value={searchQuery}
// //           onChange={(e) => {
// //             setSearchQuery(e.target.value);
// //             if (e.target.value.length >= 2) {
// //               setShowSuggestions(true);
// //             }
// //           }}
// //           onFocus={() => {
// //             if (searchQuery.length >= 2 && suggestions.length > 0) {
// //               setShowSuggestions(true);
// //             }
// //           }}
// //           className="search-input"
// //           autoComplete="off"
// //         />
// //         <button type="submit" className="search-button">
// //           <i className="fas fa-search"></i>
// //         </button>
// //       </form>

// //       {showSuggestions && (
// //         <div className="suggestions-dropdown">
// //           {isLoading ? (
// //             <div className="suggestion-loading">Loading...</div>
// //           ) : suggestions.length > 0 ? (
// //             <>
// //               <div className="search-query-header">
// //                 Results for "{searchQuery}"
// //               </div>
// //               {suggestions.map((product) => (
// //                 <div
// //                   key={product.PID}
// //                   className="suggestion-item"
// //                   onClick={() => {
// //                     navigate(`/product/${product.PID}`);
// //                     setShowSuggestions(false);
// //                   }}
// //                 >
// //                   {product.Images?.[0] && (
// //                     <img
// //                       src={`/images/${product.Images[0]}`}
// //                       alt={product.Name}
// //                       className="suggestion-image"
// //                       onError={(e) => {
// //                         e.target.src = '/images/placeholder.jpg';
// //                       }}
// //                     />
// //                   )}
// //                   <div className="suggestion-details">
// //                     <div className="product-name">{product.Name}</div>
// //                     <div className="product-price">₹{product.Price}</div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </>
// //           ) : (
// //             <div className="suggestion-empty">
// //               No results found for "{searchQuery}"
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchBar;

// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./SearchBar.css";

// // const SearchBar = () => {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const searchRef = useRef(null);
// //   const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       if (searchQuery.trim().length >= 2) {
// //         setIsLoading(true);
// //         try {
// //           const response = await axios.get(
// //             `${API_BASE}/api/search/suggest?query=${searchQuery}`
// //           );
          
// //           const formatted = response.data.map(product => ({
// //             ...product,
// //             Images: typeof product.Images === 'string' ? 
// //                    JSON.parse(product.Images.replace(/\\"/g, '"')) : 
// //                    product.Images
// //           }));
          
// //           setSuggestions(formatted);
// //           setShowSuggestions(true);
// //         } catch (error) {
// //           console.error('API Error:', error);
// //           setSuggestions([]);
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setSuggestions([]);
// //         setShowSuggestions(false);
// //       }
// //     };

// //     const timer = setTimeout(fetchSuggestions, 300);
// //     return () => clearTimeout(timer);
// //   }, [searchQuery, API_BASE]);

// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// //         setShowSuggestions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// //       setShowSuggestions(false);
// //     }
// //   };

// //   return (
// //     <div className="search-container" ref={searchRef}>
// //       <form onSubmit={handleSearchSubmit} className="search-form">
// //         <input
// //           type="text"
// //           placeholder="Search for Products, Brands and More"
// //           value={searchQuery}
// //           onChange={(e) => {
// //             setSearchQuery(e.target.value);
// //             setShowSuggestions(e.target.value.length >= 2);
// //           }}
// //           onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
// //           className="search-input"
// //           autoComplete="off"
// //         />
// //              <button type="submit" className="search-icon-button" aria-label="Search">
// //               <i className="fas fa-search"></i>
// //             </button>
// //       </form>

// //       {showSuggestions && (
// //         <div className="suggestions-dropdown">
// //           {isLoading ? (
// //             <div className="suggestion-loading">Loading...</div>
// //           ) : suggestions.length > 0 ? (
// //             <>
// //               <div className="search-query-header">
// //                 Results for "{searchQuery}"
// //               </div>
// //               {suggestions.map((product) => (
// //                 <div
// //                   key={product.PID}
// //                   className="suggestion-item"
// //                   onClick={() => {
// //                     navigate(`/product/${product.PID}`);
// //                     setShowSuggestions(false);
// //                   }}
// //                 >
// //                   {product.Images?.[0] && (
// //                     <img
// //                       src={`/images/${product.Images[0]}`}
// //                       alt={product.Name}
// //                       className="suggestion-image"
// //                       onError={(e) => {
// //                         e.target.src = '/images/placeholder.jpg';
// //                       }}
// //                     />
// //                   )}
// //                   <div className="suggestion-details">
// //                     <div className="product-name">{product.Name}</div>
// //                     <div className="product-category">{product.Category}</div>
// //                     <div className="product-price">₹{product.Price}</div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </>
// //           ) : searchQuery.length >= 2 ? (
// //             <div className="suggestion-empty">
// //               No results found for "{searchQuery}"
// //             </div>
// //           ) : null}
// //         </div>
        
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchBar;

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
                      src={`/images/${product.Images[0]}`}
                      alt={product.Name}
                      className="suggestion-image"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
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