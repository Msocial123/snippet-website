import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="snippet-footer">
      <div className="footer-top">Back to top</div>
      <div className="footer-content">
        <div>
          <h4>Get to Know Us</h4>
          <p>About Snippet</p>
          <p>Careers</p>
          <p>Press</p>
        </div>
        <div>
          <h4>Connect with Us</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div>
          <h4>Make Money with Us</h4>
          <p>Become a Partner</p>
          <p>Advertise with Us</p>
          <p>Join Affiliate</p>
        </div>
        <div>
          <h4>Let Us Help You</h4>
          <p>Your Account</p>
          <p>Help</p>
          <p>Returns Center</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Snippet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
