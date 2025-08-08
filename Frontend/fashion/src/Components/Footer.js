import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Shop</h4>
          <p>Lorem Is Dolor Sit Amet, Consectetur Adipisicing Elit. Read More</p>
          <p>E. Hello@Uxper.Co</p>
          <p>T. (91) 345 454 54 22</p>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Store Locator</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li>Size Guide</li>
            <li>Help & FAQs</li>
            <li>Return My Order</li>
            <li>Refer A Friend</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Terms & Policies</h4>
          <ul>
            <li>Duties & Taxes</li>
            <li>Shipping Info</li>
            <li>Privacy Policy</li>
            <li>Terms Conditions</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Threads</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
