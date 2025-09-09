import React from "react";
import "./AboutSnippet.css";
import { Link } from "react-router-dom";


const Collection = () => {
  return (
    <>
      {/* Banner Section */}
      <section className="about-banner-section">
        <div className="about-banner-image">
          <img
            src="/images/AboutFinal.png"
            alt="FW25 Collection Banner"
            className="banner-img"
          />
        </div>
      </section>

      {/* Collection Section */}
      <section className="collection-section">
        <div className="collection-container">
          {/* Top: Title + Subtitle */}
          <div className="browse-section">
            <h3 className="browse-title">Our Collection</h3>
            <p className="browse-subtitle">
              Collection featuring minimal clothing items
            </p>
          </div>

          {/* Two-column layout */}
          <div className="collection-grid">
            {/* Left: Image */}
            <div className="collection-image">
              <img
                src="/images/Aboutus.png"
                alt="Modern Essentials"
              />
            </div>

            {/* Right: Content */}
            <div className="collection-content">
              <h3 className="content-title">Modern Essentials</h3>
              <p className="content-description">
                From premium cotton tees to structured outerwear, each piece is
                designed to seamlessly integrate into your wardrobe. Our neutral
                palette ensures versatility while maintaining that distinctive
                Snippet aesthetic.
              </p>

              {/* Features */}
              <div className="features-container">
                <div className="feature-item">
                  <div className="feature-bullet" />
                  <div>
                    <h4 className="feature-title">Sustainable Materials</h4>
                    <p className="feature-description">
                      Organic cotton, recycled fibers, and ethically sourced
                      materials.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-bullet" />
                  <div>
                    <h4 className="feature-title">Timeless Design</h4>
                    <p className="feature-description">
                      Pieces that transcend seasons and trends.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="cta-container">
  <Link to="/">
    <button className="cta-button">Explore Collection</button>
  </Link>
</div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
