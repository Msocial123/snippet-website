import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

function ContactUs() {
      const navigate = useNavigate();
  return (
    <div className="contactus-page">
   
      <header className="contactus-header">
        <h1>Contact Us</h1>
        <p>
          We're here to help and answer any questions you might have.<br />
          We look forward to hearing from you.
        </p>
      </header>
      <button
        onClick={() => navigate(-1)} // navigate back
        className="back-button"
        aria-label="Go back to previous page"
      >
        ← Back
      </button>
      <section className="contactus-main">
        <div className="contactus-info">
          <h2>Get in touch</h2>
          <p>Here are the different ways you can reach us</p>
          <div className="contactus-card">
            <div className="contactus-card-icon">
              <span role="img" aria-label="Phone">📞</span>
            </div>
            <div>
              <strong>Phone</strong>
              <p style={{ margin: 0, fontSize: "1rem" }}>Call us during business hours</p>
              <div className="contactus-phone">
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contactus-form-container">
          <h2>Send us a message</h2>
          <p>We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>
          <form className="contactus-form">
            <div className="contactus-form-row">
              <div>
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" placeholder="Enter your full name" required />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="Enter your email address" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" placeholder="What’s this about?" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Type your message here..." required></textarea>
            </div>
            <button className="contactus-submit" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Business Hours & Find Us Section */}
      <section className="contactus-details">
        <div className="contactus-hours-card">
          <div className="contactus-card-icon"><span role="img" aria-label="Clock">🕒</span></div>
          <div>
            <strong>Business Hours</strong>
            <div style={{ fontSize: "1rem", color: "#7c746f" }}>We're here to help</div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 600 }}>Monday - Friday: <span style={{ fontWeight: 400 }}>9:00 AM - 6:00 PM</span></div>
              <div style={{ fontWeight: 600 }}>Saturday: <span style={{ fontWeight: 400 }}>10:00 AM - 4:00 PM</span></div>
            </div>
          </div>
        </div>
        <div className="contactus-findus">
          <h2>Find Us</h2>
          <div className="contactus-map-card">
            <div className="contactus-map-icon">
              {/* Pin SVG */}
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                <ellipse cx="20" cy="18" rx="12" ry="12" fill="#E74518" stroke="#232323" strokeWidth="2"/>
                <rect x="18" y="20" width="4" height="28" fill="#232323"/>
                <ellipse cx="20" cy="50" rx="7" ry="3" fill="#232323" opacity="0.3"/>
              </svg>
            </div>
            <div className="contactus-map-details">
              <div className="contactus-map-title">You can find Us Here</div>
              <div>
                 2nd floor, 29/2, 1st Main Rd, Old Madiwala, Maruti Nagar, 1st Stage, BTM Layout, Bengaluru, Karnataka 560068
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;

