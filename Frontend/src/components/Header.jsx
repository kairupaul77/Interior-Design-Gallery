// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/haha.jpg'; 

const Header = () => {
  return (
    <header>
      <h1>Interior Design Gallery</h1>
       {/* Logo with a link to the homepage */}
       <div className="logo-container">
        <Link to="/">
          <img src={logo } alt="Interior Design Gallery Logo" className="logo" />
        </Link>
      </div>
      <nav>
        <Link to="/"></Link> | 
        <Link to="/home"></Link> | 
        <Link to="/about"></Link>
      </nav>
    </header>
  );
};
export default Header;
