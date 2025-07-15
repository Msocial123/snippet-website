import React from "react";
import "./BlogStyles.css";
// import photo from "../../assets/photo.PNG";

const DropDiaries = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">Drop Diaries</h1>
        <p className="blog-content">
          Welcome to Drop Diaries! Stay in the loop with our latest fashion drops, exclusive releases, and behind-the-scenes stories. From streetwear essentials to statement pieces, we bring you the story behind every launch.
        </p>
        <img src={photo} alt="Drop Diaries Banner" className="blog-banner" />

      </div>
    </div>
  );
};

export default DropDiaries;
