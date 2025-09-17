// import React from "react";
// import "./BlogStyles.css";
// // import photo from "../../assets/photo.PNG";

// const DropDiaries = () => {
//   return (
//     <div className="blog-wrapper">
//       <div className="blog-container">
//         <h1 className="blog-title">Drop Diaries</h1>
//         <p className="blog-content">
//           Welcome to Drop Diaries! Stay in the loop with our latest fashion drops, exclusive releases, and behind-the-scenes stories. From streetwear essentials to statement pieces, we bring you the story behind every launch.
//         </p>
//         {/* <img src={photo} alt="Drop Diaries Banner" className="blog-banner" /> */}

//       </div>
//     </div>
//   );
// };

// export default DropDiaries;

import React from "react";
import "./DropDiaries.css";

function DropDiaries() {
  return (
    <div className="homepage-root">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-center-content">
          <h1>
            Welcome to <span className="brand-highlight">Drop Diaries</span>
          </h1>
          <p>
            Stay in the loop with our latest fashion drops, exclusive releases, and behind the scenes stories.<br />
            From streetwear essentials to statement pieces, we bring you the story behind every launch.
          </p>
          {/* <div className="hero-btn-row">
            <button className="hero-btn">Explore Latest Drops</button>
            <input className="hero-email" placeholder="Enter your email..." />
          </div> */}
        </div>
      </section>

      {/* Featured Drops */}
      <section className="featured-drops">
        <h2>Featured Drops</h2>
        <p>Discover the latest releases that are defining streetwear culture</p>
        <div className="drops-grid">
          <div className="drop-card">
            <span className="status-badge just-dropped">Just Dropped</span>
            <img src="/images/Urban.png" alt="Urban Runner Collection" />
            <div className="drop-info">
              <div className="drop-title-row">
                <h3>Urban Collection</h3>
                <span className="drop-price">$189</span>
              </div>
              <div className="drop-sub">
                Limited edition streetwear hoodies that blend comfort with cutting-edge design.
              </div>
              <button>Shop Now</button>
            </div>
          </div>
          <div className="drop-card">
            <span className="status-badge coming-soon">Coming Soon</span>
            <img src="/images/JacketContact.png" alt="Minimalist Tech Jacket" />
            <div className="drop-info">
              <div className="drop-title-row">
                <h3>Minimalist Tech Jacket</h3>
                <span className="drop-price">$299</span>
              </div>
              <div className="drop-sub">
                Weather-resistant outerwear designed for the modern urban explorer.
              </div>
              <button>Get Notified</button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="latest-stories">
        <h2>Latest Stories</h2>
        <p>Deep dives into fashion culture, design processes, and industry insights</p>
        <div className="stories-grid">
          <div className="story-card">
            <span className="story-tag">Behind the Scenes</span>
            <img src="/images/BTS.png" alt="Behind the Design" />
            <div className="story-meta">2 days ago • 5 min read</div>
            <div className="story-title">Behind the Design: Creating the Urban Runner</div>
            <div className="story-desc">
              An exclusive look into the 18-month journey of designing our most ambitious sneaker yet.
            </div>
          </div>
          <div className="story-card">
            <span className="story-tag">Trends</span>
            <img src="/images/JacketContact.png" alt="Tech Wear" />
            <div className="story-meta">1 week ago • 3 min read</div>
            <div className="story-title">The Rise of Tech-Wear in Street Fashion</div>
            <div className="story-desc">
              How functional clothing is reshaping the streetwear landscape.
            </div>
          </div>
          <div className="story-card">
            <span className="story-tag">Sustainability</span>
            <img src="/images/Urban.png" alt="Sustainable Streetwear" />
            <div className="story-meta">2 weeks ago • 4 min read</div>
            <div className="story-title">Sustainable Streetwear: The Future is Now</div>
            <div className="story-desc">
              Exploring eco-friendly materials and ethical production in modern fashion.
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-block">
        <h2>Never Miss a Drop</h2>
        <p>
          Get exclusive access to upcoming releases, behind-the-scenes content, and<br />
          insider stories delivered straight to your inbox.
        </p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe Now</button>
        </form>
        <span className="newsletter-note">
          Join 50,000+ fashion enthusiasts. Unsubscribe anytime.
        </span>
      </section>

      {/* Footer */}
      <footer className="footer-block">
        <div>
          <div className="footer-brand">Drop Diaries</div>
          <p>Your ultimate destination for fashion drops, streetwear culture, and exclusive behind-the-scenes content.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>Latest Drops</li>
            <li>Stories</li>
            <li>Streetwear</li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>TikTok</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default DropDiaries;
