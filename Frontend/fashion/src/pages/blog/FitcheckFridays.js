import React from "react";
import "./BlogStyles.css";
// import Fitcheck from "../../assets/Fitcheck.png";

const FitcheckFridays = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">Fitcheck Fridays</h1>
        <p className="blog-content">
          Every Friday, we feature the best outfits from the Snippet community. Show us how you rock your fits and get featured in our weekly roundup!
        </p>
        <img src={Fitcheck} alt="Drop Diaries Banner" className="blog-banner" />
      </div>
    </div>
  );
};

export default FitcheckFridays;
