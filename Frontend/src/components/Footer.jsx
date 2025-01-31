import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for links

const Footer = () => {
  return (
    <footer>
      <ul>
        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        <li><Link to="/terms-of-service">Terms of Service</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <p>&copy; 2025 Interior Design Gallery</p>
    </footer>
  );
}

export default Footer;
