// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Landingpage.css';



// const LandingPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/landing')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Fetch error:', err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-10">Snitch Store - Trending Now</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((product) => {
//           let images = [];
//           try {
//             images = JSON.parse(product.Images);
//           } catch (e) {
//             images = [];
//           }
//           const imageUrl = images.length > 0 ? images[0] : 'https://via.placeholder.com/300';

//           return (
//             <div key={product.PID} className="bg-white p-4 rounded shadow hover:shadow-md transition">
//               <img src={imageUrl} alt={product.Name} className="w-full h-64 object-cover rounded mb-3" />
//               <h2 className="text-xl font-semibold">{product.Name}</h2>
//               <p className="text-gray-600">Brand: {product.Brand}</p>
//               <p className="text-red-500 font-bold text-lg">₹{product.Price}</p>
//               <p className="text-sm text-gray-500">{product.ReviewSummary}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Landingpage.css';

// const LandingPage = () => {
//   const [products, setProducts] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/landing')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Fetch error:', err));

//     axios.get('http://localhost:5000/api/reviews')
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error('Reviews fetch error:', err));
//   }, []);

//   const categories = [
//     { name: "Men", img: "https://via.placeholder.com/200x300?text=Men" },
//     { name: "Women", img: "https://via.placeholder.com/200x300?text=Women" }
//   ];
//   const features = [
//     { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
//     { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
//     { icon: "🔄", title: "Easy Returns", desc: "7-day hassle-free returns" }
//   ];
//   const instagram = [
//     "https://via.placeholder.com/120x120?text=Insta1",
//     "https://via.placeholder.com/120x120?text=Insta2",
//     "https://via.placeholder.com/120x120?text=Insta3",
//     "https://via.placeholder.com/120x120?text=Insta4",
//     "https://via.placeholder.com/120x120?text=Insta5",
//     "https://via.placeholder.com/120x120?text=Insta6"
//   ];

//   return (
//     <div className="landing-root">
     

//       {/* Hero Banner */}
//       <section className="hero-banner">
//         <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80" alt="Hero" className="hero-img" />
//         <div className="hero-content">
//           <h1>Design For Beauty</h1>
//           <p>Summer Collection 2025</p>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="categories">
//         <div className="category-list">
//           {categories.map((cat) => (
//             <div key={cat.name} className="category-card">
//               <img src={cat.img} alt={cat.name} />
//               <button className="btn">{cat.name}</button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Best Selling Products */}
//       <section className="products-section">
//         <h2 className="section-title">Best Selling Products</h2>
//         {/* Filter Buttons (static for now) */}
//         <div className="product-filters">
          
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.slice(0, 8).map((product) => {
//             let images = [];
//             try { images = JSON.parse(product.Images); } catch (e) { images = []; }
//             const imageUrl = images.length > 0 ? images[0] : 'https://via.placeholder.com/300';
//             return (
//               <div key={product.PID} className="bg-white p-4 rounded shadow hover:shadow-md transition">
//                 <img src={imageUrl} alt={product.Name} className="w-full h-64 object-cover rounded mb-3" />
//                 <h2 className="text-xl font-semibold">{product.Name}</h2>
//                 <p className="text-gray-600">Brand: {product.Brand}</p>
//                 <p className="text-red-500 font-bold text-lg">₹{product.Price}</p>
//                 <p className="text-sm text-gray-500">{product.ReviewSummary}</p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Features */}
//       <section className="features">
//         <div className="features-list">
//           {features.map((f) => (
//             <div key={f.title} className="feature-card">
//               <span className="feature-icon">{f.icon}</span>
//               <h4>{f.title}</h4>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Highlighted Promo/Testimonial */}
//       <section className="promo-section">
//         <div className="promo-card">
//           <img src="https://via.placeholder.com/200x260?text=Promo" alt="Promo" className="promo-img" />
//           <div>
//             <h3>Limited Time Offer</h3>
//             <p>Get exclusive deals on our summer collection. Shop now and enjoy premium quality at the best prices!</p>
//           </div>
//         </div>
//       </section>

//       {/* Customer Reviews */}
//       <section className="reviews">
//         <h2 className="section-title">Customer Reviews</h2>
//         <div className="reviews-list">
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((r, i) => (
//               <div key={i} className="review-card">
//                 <strong>{r.name}</strong>
//                 <p>{r.review}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       {/* Instagram Gallery */}
//       <section className="instagram">
//         <h2 className="section-title">Instagram With #SummerWithSnippets</h2>
//         <div className="instagram-list">
//           {instagram.map((img, i) => (
//             <img key={i} src={img} alt="Instagram" className="insta-img" />
//           ))}
//         </div>
//       </section>

      
//     </div>
//   );
// };

// export default LandingPage;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Landingpage.css';
// import { useParams, useNavigate } from 'react-router-dom';



// const FILTERS = [
//   'All',
//   'Casual Shirts',
//   'Formal Shirts',
//   'T-Shirts',
//   'Pants',
//   'Jeans',
//   'Hoodie'
// ];

// const LandingPage = () => {
//   const [products, setProducts] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/landing')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Fetch error:', err));

//     axios.get('http://localhost:5000/api/products/reviews')
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error('Reviews fetch error:', err));
//   }, []);

//   const categories = [
//     { name: "Men", img: "https://via.placeholder.com/200x300?text=Men" },
//     { name: "Women", img: "https://via.placeholder.com/200x300?text=Women" }
//   ];

//   const features = [
//     { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
//     { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
//     { icon: "🔀", title: "Easy Returns", desc: "7-day hassle-free returns" }
//   ];

//   const instagram = [
//     "https://via.placeholder.com/120x120?text=Insta1",
//     "https://via.placeholder.com/120x120?text=Insta2",
//     "https://via.placeholder.com/120x120?text=Insta3",
//     "https://via.placeholder.com/120x120?text=Insta4",
//     "https://via.placeholder.com/120x120?text=Insta5",
//     "https://via.placeholder.com/120x120?text=Insta6"
//   ];

//   const filteredProducts = activeFilter === 'All'
//     ? products
//     : products.filter((p) =>
//         p.Category &&
//         p.Category.toLowerCase().replace(/\s/g, '') === activeFilter.replace(/\s/g, '').toLowerCase()
//       );

//   return (
//     <div className="landing-root">
//       <section className="hero-banner">
//         <img src="photo1.png" alt="Hero" className="hero-img" />
//         <div className="hero-content">
//           <h1>Design For Beauty</h1>
//           <p>Summer Collection 2025</p>
//         </div>
//       </section>

//       <section className="categories">
//         <div className="category-list">
//           {categories.map((cat) => (
//             <div key={cat.name} className="category-card">
//               <img src={cat.img} alt={cat.name} />
//               <button className="btn">{cat.name}</button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="products-section">
//         <h2 className="section-title">Best Selling Product</h2>
//         <div className="product-filters">
//           {FILTERS.map((filter) => (
//             <button
//               key={filter}
//               className={`btn${activeFilter === filter ? ' active' : ''}`}
//               onClick={() => setActiveFilter(filter)}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         <div className="product-grid">
//           {filteredProducts.slice(0, 8).map((product) => {
//             let images = [];
//             try { images = JSON.parse(product.Images); } catch (e) { images = []; }
//             const imageUrl = images.length > 0 ? `/images/${images[0]}` : 'https://via.placeholder.com/300';

//             const oldPrice = product.OldPrice || (product.Price * 2).toFixed(0);
//             const discount = product.DiscountPercent || '50% OFF';
//             const rating = product.Rating || '4.2';
//             const reviewCount = product.ReviewCount || '659';

//             return (
//               <div key={product.PID} className="product-card">
//                 <div className="product-img-wrap">
//                   <img src={imageUrl} alt={product.Name} className="product-img" />
//                   <button className="fav-btn" title="Add to wishlist">♡</button>
//                 </div>
//                 <div className="product-info">
//                   <div className="product-rating">
//                     <span className="rating-star">{rating}</span>
//                     <span className="star-icon">★</span>
//                     <span className="review-count">{reviewCount}</span>
//                   </div>
//                   <div className="product-brand">{product.Brand || "Snippet"}</div>
//                   <div className="product-name">{product.Name}</div>
//                   <div className="product-desc">{product.Description || 'Lightly Washed Slim Fit Jeans'}</div>
//                   <div className="product-price-row">
//                     <span className="product-price">Rs. {product.Price}</span>
//                     <span className="product-oldprice">Rs. {oldPrice}</span>
//                     <span className="product-discount">({discount})</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <button className="load-more-btn">Load More</button>
//       </section>

//       <section className="features">
//         <div className="features-list">
//           {features.map((f) => (
//             <div key={f.title} className="feature-card">
//               <span className="feature-icon">{f.icon}</span>
//               <h4>{f.title}</h4>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="promo-section">
//         <div className="promo-card">
//           <img src="https://via.placeholder.com/200x260?text=Promo" alt="Promo" className="promo-img" />
//           <div>
//             <h3>Limited Time Offer</h3>
//             <p>Get exclusive deals on our summer collection. Shop now and enjoy premium quality at the best prices!</p>
//           </div>
//         </div>
//       </section>

//       <section className="reviews">
//         <h2 className="section-title">Customer Reviews</h2>
//         <div className="reviews-list">
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((r, i) => (
//               <div key={i} className="review-card">
//                 <strong>{r.FirstName}</strong>
//                 <p>{r.Comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       <section className="instagram">
//         <h2 className="section-title">Instagram With #SummerWithSnippets</h2>
//         <div className="instagram-list">
//           {instagram.map((img, i) => (
//             <img key={i} src={img} alt="Instagram" className="insta-img" />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Landingpage.css';
import { useParams, useNavigate } from 'react-router-dom';

const FILTERS = ['All', 'Shirts', 'T-Shirts', 'Jackets', 'Blazers', 'Bottomwear'];


const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Fetch products and reviews once
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/landing')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Fetch error:', err));

    axios.get('http://localhost:5000/api/products/reviews')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Reviews fetch error:', err));
  }, []);

  // Set filter when URL param changes
  useEffect(() => {
  if (categoryName) {
    const formatted = categoryName.replace(/-/g, '').toLowerCase();

    const matchedFilter = FILTERS.find(f =>
      f.replace(/[\s-]/g, '').toLowerCase() === formatted
    );

    if (matchedFilter) {
      setActiveFilter(matchedFilter);
    }
  } else {
    setActiveFilter('All');
  }
}, [categoryName]);

  const categories = [
    { name: "Men", img: "/images/ChatGPT Image Jul 14, 2025, 10_29_29 AM.png" },
    { name: "Women", img: "/images/Screenshot 2025-07-14 101841.png" }
  ];

  const features = [
    { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
    { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
    { icon: "🔀", title: "Easy Returns", desc: "7-day hassle-free returns" }
  ];

  
  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((p) =>
        p.Category &&
        p.Category.toLowerCase().replace(/\s/g, '') === activeFilter.replace(/\s/g, '').toLowerCase()
      );

      

  return (
    <div className="landing-root">
      {/* Hero Section */}
      <section className="hero-banner">
        <img src="photo1.png" alt="Hero" className="hero-img" />
        <div className="hero-content">
          <h1>Design For Beauty</h1>
          <p>Summer Collection 2025</p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="category-list">
          {categories.map((cat) => (
            <div key={cat.name} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <button className="btn">{cat.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Best Selling Product</h2>

        {/* Filter Buttons */}
        <div className="product-filters">
  {FILTERS.map(filter => (
    <button
      key={filter}
      className={`btn${activeFilter === filter ? ' active' : ''}`}
      onClick={() => {
        if (filter === 'All') navigate('/');
        else {
          const slug = filter.toLowerCase().replace(/\s/g, '-');
          navigate(`/category/${slug}`);
        }
      }}
    >{filter}</button>
  ))}
</div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.slice(0, 8).map((product) => {
            let images = [];
            try {
              images = JSON.parse(product.Images);
            } catch (e) {
              images = [];
            }
              // const imageFilename = product.Images; // directly use it
              // const imageUrl = `/images/${imageFilename}`;

             const imageUrl = `/images/${product.Images}`;


            const oldPrice = product.OldPrice || (product.Price * 2).toFixed(0);
            const discount = product.DiscountPercent || '50% OFF';
            const rating = product.Rating || '4.2';
            const reviewCount = product.ReviewCount || '659';

            return (
              <div key={product.PID} className="product-card">
                <div className="product-img-wrap">
                  <img src={imageUrl} alt={product.Name} className="product-img" />
                  <button className="fav-btn" title="Add to wishlist">♡</button>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <span className="rating-star">{rating}</span>
                    <span className="star-icon">★</span>
                    <span className="review-count">{reviewCount}</span>
                  </div>
                  <div className="product-brand">{product.Brand || "Snippet"}</div>
                  <div className="product-name">{product.Name}</div>
                  <div className="product-desc">{product.Description || 'Lightly Washed Slim Fit Jeans'}</div>
                  <div className="product-price-row">
                    <span className="product-price">Rs. {product.Price}</span>
                    <span className="product-oldprice">Rs. {oldPrice}</span>
                    <span className="product-discount">({discount})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="load-more-btn">Load More</button>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-list">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="promo-section">
        <div className="promo-card">
          <img src="/images/Screenshot 2025-07-14 101841.png" alt="Promo" className="promo-img" />

          <div>
            <h3>Limited Time Offer</h3>
            <p>Get exclusive deals on our summer collection. Shop now and enjoy premium quality at the best prices!</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="review-card">
                <strong>{r.FirstName}</strong>
                <p>{r.Comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      
    </div>
  );
};

export default LandingPage;
