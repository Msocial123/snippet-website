




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Landingpage.css';
// import { useParams, useNavigate } from 'react-router-dom';

// const FILTERS = ['All', 'Shirts', 'T-Shirts', 'Jackets', 'Blazers', 'Bottomwear'];


// const LandingPage = () => {
//   const [products, setProducts] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('All');

//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   // Fetch products and reviews once
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/landing')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error('Fetch error:', err));

//     axios.get('http://localhost:5000/api/products/reviews')
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error('Reviews fetch error:', err));
//   }, []);

//   // Set filter when URL param changes
//   useEffect(() => {
//   if (categoryName) {
//     const formatted = categoryName.replace(/-/g, '').toLowerCase();

//     const matchedFilter = FILTERS.find(f =>
//       f.replace(/[\s-]/g, '').toLowerCase() === formatted
//     );

//     if (matchedFilter) {
//       setActiveFilter(matchedFilter);
//     }
//   } else {
//     setActiveFilter('All');
//   }
// }, [categoryName]);

//   const categories = [
//     { name: "Men", img: "/images/ChatGPT Image Jul 14, 2025, 10_29_29 AM.png" },
//     { name: "Women", img: "/images/Screenshot 2025-07-14 101841.png" }
//   ];

//   const features = [
//     { icon: "💬", title: "24/7 Support", desc: "Chat with us anytime" },
//     { icon: "🚚", title: "Free Shipping", desc: "On all orders above ₹999" },
//     { icon: "🔀", title: "Easy Returns", desc: "7-day hassle-free returns" }
//   ];

  
//   const filteredProducts = activeFilter === 'All'
//     ? products
//     : products.filter((p) =>
//         p.Category &&
//         p.Category.toLowerCase().replace(/\s/g, '') === activeFilter.replace(/\s/g, '').toLowerCase()
//       );

      

//   return (
//     <div className="landing-root">
//       {/* Hero Section */}
//       <section className="hero-banner">
//         <img src="photo1.png" alt="Hero" className="hero-img" />
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

//       {/* Products Section */}
//       <section className="products-section">
//         <h2 className="section-title">Best Selling Product</h2>

//         {/* Filter Buttons */}
//         <div className="product-filters">
//   {FILTERS.map(filter => (
//     <button
//       key={filter}
//       className={`btn${activeFilter === filter ? ' active' : ''}`}
//       onClick={() => {
//         if (filter === 'All') navigate('/');
//         else {
//           const slug = filter.toLowerCase().replace(/\s/g, '-');
//           navigate(`/category/${slug}`);
//         }
//       }}
//     >{filter}</button>
//   ))}
// </div>

//         {/* Product Grid */}
//         <div className="product-grid">
//           {filteredProducts.slice(0, 8).map((product) => {
//             let images = [];
//             try {
//               images = JSON.parse(product.Images);
//             } catch (e) {
//               images = [];
//             }
//               // const imageFilename = product.Images; // directly use it
//               // const imageUrl = `/images/${imageFilename}`;

//              const imageUrl = `/images/${product.Images}`;


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

//       {/* Promo */}
//       <section className="promo-section">
//         <div className="promo-card">
//           <img src="/images/Screenshot 2025-07-14 101841.png" alt="Promo" className="promo-img" />

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
//                 <strong>{r.FirstName}</strong>
//                 <p>{r.Comment}</p>
//               </div>
//             ))
//           )}
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

  // Fetch products and reviews
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/landing')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Fetch error:', err));

    axios.get('http://localhost:5000/api/products/reviews')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Reviews fetch error:', err));
  }, []);

  // Update filter based on URL param
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

  // Filtered products based on selected filter
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
        <img src="/photo1.png" alt="Hero" className="hero-img" />
        <div className="hero-content">
          <h1>Design For Beauty</h1>
          <p>Summer Collection 2025</p>
        </div>
      </section>

      {/* Category Navigation */}
     <section className="categories">
  <div className="category-list">
    {categories.map((cat) => (
      <div key={cat.name} className="category-card">
        <img src={cat.img} alt={cat.name} />
        <button
          className="btn"
          onClick={() => {
            if (cat.name.toLowerCase() === "men") navigate("/mencollection");
            else navigate(`/category/${cat.name.toLowerCase()}`);
          }}
        >
          {cat.name}
        </button>
      </div>
    ))}
  </div>
</section>


      {/* Product Filter Buttons */}
      <section className="products-section">
        <h2 className="section-title">Best Selling Product</h2>

        <div className="product-filters">
          {FILTERS.map(filter => (
            <button
              key={filter}
              className={`btn${activeFilter === filter ? ' active' : ''}`}
              onClick={() => {
                if (filter === 'All') navigate('/');
                else navigate(`/category/${filter.toLowerCase().replace(/\s/g, '-')}`);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.slice(0, 8).map((product) => {
            let imageUrl = "";
            try {
              const parsedImages = JSON.parse(product.Images);
              const firstImage = Array.isArray(parsedImages) ? parsedImages[0] : parsedImages;
              imageUrl = `/images/${firstImage}`;
            } catch (e) {
              imageUrl = `/images/${product.Images}`;
            }

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

      {/* Promo Section */}
      <section className="promo-section">
        <div className="promo-card">
          <img src="/images/Screenshot 2025-07-14 101841.png" alt="Promo" className="promo-img" />
          <div>
            <h3>Limited Time Offer</h3>
            <p>Get exclusive deals on our summer collection. Shop now and enjoy premium quality at the best prices!</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="review-card">
                <strong>{r.name}</strong>
                <p>{r.review}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
