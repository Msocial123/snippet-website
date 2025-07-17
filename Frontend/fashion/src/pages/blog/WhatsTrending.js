import React from "react";
import "./BlogStyles.css";
// import Trending from "../../assets/Trending.png";

const WhatsTrending = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">What's Trending</h1>
        <p className="blog-content">
          Discover what’s hot in fashion right now. From rising trends to popular prints and colors, stay updated on the movements shaping today’s streetwear culture.
        </p>
        {/* <img src={Trending} alt="Drop Diaries Banner" className="blog-banner" /> */}
      </div>
    </div>
  );
};

export default WhatsTrending;
