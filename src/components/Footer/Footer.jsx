// Footer.jsx - Updated with accessibility improvements
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import '../../styles/Homepage.css';
import NavLogo from '../../../public/LOGO.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-inner">
        {/* Brand + About */}
        <div className="footer-col">
          <img
            src={NavLogo}
            alt="Angelo Biotech Africa logo"
            className="footer-logo"
          />
          <p className="footer-about">
            Angelo Biotech Africa is a leading innovator in anti-aging, cellular
            regeneration, and wellness solutions — with global offices in 30+
            countries and regions.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="footer-col" aria-labelledby="footer-nav-title">
          <h3 id="footer-nav-title" className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#team">Our Team</a>
            </li>
            <li>
              <a href="#global">Global Presence</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Social + Contact */}
        <div className="footer-col">
          <h3 className="footer-title">Connect</h3>
          <div className="footer-socials" role="list" aria-label="Social media links">
            <a 
              href="https://facebook.com/angelobiotechafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a 
              href="https://twitter.com/angelobiotechafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a 
              href="https://instagram.com/angelobiotechafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a 
              href="https://linkedin.com/company/angelobiotechafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Connect with us on LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a 
              href="https://youtube.com/@angelobiotechafrica" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Subscribe to our YouTube channel"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>

          <address className="footer-contact">
            <a href="mailto:info@angelobiotech.com" aria-label="Email us">
              📧 info@angelobiotech.com
            </a>
            <br />
            <a href="tel:+2348001234567" aria-label="Call us">
              📞 +234 800 123 4567
            </a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {currentYear} Angelo Biotech Africa. All rights reserved.
        </p>
        <p className="footer-credit">
          Crafted with ❤️ by Angelo Biotech Dev Team
        </p>
      </div>
    </footer>
  );
}