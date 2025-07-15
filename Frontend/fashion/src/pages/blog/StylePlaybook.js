import React from "react";
import "./BlogStyles.css";
// import Style from "../../assets/Style.png";

const StylePlaybook = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">Style Playbook</h1>
        <p className="blog-content">
          Style Playbook is your go-to guide for mastering outfit combinations, layering techniques, and seasonal transitions. Learn how to elevate basics and build a wardrobe that reflects your personality.
        </p>
<img src={Style} alt="Drop Diaries Banner" className="blog-banner" />
      </div>
    </div>
  );
};

export default StylePlaybook;
