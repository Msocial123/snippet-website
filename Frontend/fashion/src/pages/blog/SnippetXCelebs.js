import React from "react";
import "./BlogStyles.css";
// import celebs from "../../assets/celebs.png";

const SnippetXCelebs = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">Snippet X Celebs</h1>
        <p className="blog-content">
          Celebrities love Snippet too! See how top artists and actors are styling our latest collections. Get the celeb look with affordable alternatives.
        </p>
        <img src={celebs} alt="Drop Diaries Banner" className="blog-banner" />
      </div>
    </div>
  );
};

export default SnippetXCelebs;
