import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  

  return (
    <div>
      <h1>Welcome to the Interior Design Gallery</h1>
      <p>Explore the best interior design ideas and inspirations.</p>

     

      {/* Image Display */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <img
          src="https://i.pinimg.com/736x/79/b1/45/79b145fc7d4b4e88857f7d2228a2eb23.jpg"
          alt="Interior Design 1"
          style={{ width: '300px', height: '200px', borderRadius: '10px' }}
        />
        <img
          src="https://i.pinimg.com/736x/93/60/7b/93607bf1f9242b6674e17bb5ede14d4e.jpg"
          alt="Interior Design 2"
          style={{ width: '300px', height: '200px', borderRadius: '10px' }}
        />
      </div>

      {/* Buttons for navigation */}
      <Link to="/home">
        <button className="button">Go to Home</button>
      </Link>

      <Link to="/about">
        <button className="button">About Us</button>
      </Link>
    </div>
  );
};

export default Landing;
