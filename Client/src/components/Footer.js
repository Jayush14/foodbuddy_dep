import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footr() {
  return (
    <div>
      <footer
        className="d-flex flex-wrap justify-content-between align-items-center py-4 px-5"
        style={{
          backgroundColor: '#2e2e35', // Dark background color
          borderTop: '4px solid #f2b315', // Divider line
          color: '#f2b315', // Text color matching the theme
        }}
      >
        {/* Left side - Brand and copyright */}
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-decoration-none lh-1"
            style={{
              color: '#f2b315', // Yellow text color
              fontStyle: 'italic', // Italic font style for the link
              fontSize: '1.5em',
            }}
          >
            CraveCart
          </Link>
          <span className="text-muted ms-2">© 2023 Running food, Inc</span>
        </div>

        {/* Center - Navigation Links */}
        <ul className="nav col-md-4 justify-content-center">
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-muted" style={{ color: '#f2b315' }}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 text-muted" style={{ color: '#f2b315' }}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/privacy" className="nav-link px-2 text-muted" style={{ color: '#f2b315' }}>
              Privacy Policy
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/terms" className="nav-link px-2 text-muted" style={{ color: '#f2b315' }}>
              Terms of Service
            </Link>
          </li>
        </ul>

        {/* Right side - Social Media Links */}
        <div className="col-md-4 d-flex justify-content-end">
          <Link to="//facebook.com" className="me-3" style={{ color: '#f2b315' }}>
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </Link>
          <Link to="//twitter.com" className="me-3" style={{ color: '#f2b315' }}>
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </Link>
          <Link to="//instagram.com" className="me-3" style={{ color: '#f2b315' }}>
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </Link>
          <Link to="//linkedin.com" style={{ color: '#f2b315' }}>
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
