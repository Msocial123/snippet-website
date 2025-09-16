import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Shop</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>E. hello@uxper.co</p>
          <p>T. (91) 345 454 54 22</p>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>Store Locator</li>
            <li> <Link to="/contact-us" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
              </Link></li>
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
            <li>Terms & Conditions</li>
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
