import React from "react";
import "./BlogStyles.css";
// import influencer from "../../assets/Influencer.png";

const InfluencerPick = () => {
  return (
    <div className="blog-wrapper">
      <div className="blog-container">
        <h1 className="blog-title">Influencer Pick</h1>
        <p className="blog-content">
          Curated by top influencers, this blog highlights their favorite Snippet pieces and how they style them. Get inspired by street-savvy looks and everyday fashion icons.
        </p>
        {/* <img src={influencer} alt="Drop Diaries Banner" className="blog-banner" /> */}
        
      </div>
    </div>
  );
};

export default InfluencerPick;
