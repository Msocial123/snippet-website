// // src/components/BannerSlider.js
// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './BannerSlider.css'; // Optional for custom styling

// const banners = [
//   { id: 1, image: '/images/banner1.jpg' },
//   { id: 2, image: '/images/banner2.jpg' },
//   { id: 3, image: '/images/banner3.jpg' }
// ];


// const BannerSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false
//   };

//   return (
//     <div className="banner-slider">
//       <Slider {...settings}>
//         {banners.map((banner) => (
//           <div key={banner.id}>
//             <img src={banner.image} alt={`Banner ${banner.id}`} className="banner-image" />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default BannerSlider;
// src/components/BannerSlider.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './BannerSlider.css';

const BannerSlider = () => {
  const images = [
    "banner4.png",
    "banner2.png",
    "banner3.png"
  ];

  return (
    <div className="container-fluid-slider">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

        {/* Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img
                src={`/images/${image}`}
                className="d-block w-100 img-fluid custom-img"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;
