import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  // State to manage SignIn/SignOut
  const [isSignedIn, setIsSignedIn] = useState(false);

  // State to store user data for registration and login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);  // Store registered user info

  const navigate = useNavigate();

  // Handle form input changes for registration and login
  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'register') {
      setRegisterData({
        ...registerData,
        [name]: value,
      });
    } else if (formType === 'login') {
      setLoginData({
        ...loginData,
        [name]: value,
      });
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Validation for matching passwords and required fields
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.repeatPassword) {
      setError('All fields are required!');
      return;
    }
    if (registerData.password !== registerData.repeatPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Password should be at least 6 characters long!');
      return;
    }
    setError('');
    console.log('Registration Data:', registerData);
    // Store registered user information
    setRegisteredUser({
      email: registerData.email,
      password: registerData.password,
    });
    alert('Registration Successful!');
    setIsRegistering(false);  // Hide registration form after successful registration
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Please enter both email and password');
      return;
    }

    // Check if the entered email and password match the registered user's credentials
    if (
      registeredUser &&
      loginData.email === registeredUser.email &&
      loginData.password === registeredUser.password
    ) {
      setError('');
      setIsLoggedIn(true); // Successful login
      alert('Login Successful!');
      // Redirect to Home Page after successful login
      navigate("/home");
    } else {
      setError('Invalid email or password. Please register your account!');
    }
  };

  // Handle SignOut
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setRegisterData({
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
  };

  return (
    <div>
      <h1>Welcome to the Interior Design Gallery</h1>
      <p>Explore the best interior design ideas and inspirations.</p>

      {/* SignIn Form (Visible only when not signed in) */}
      {!isLoggedIn ? (
        <div>
          {!isRegistering ? (
            <div>
              <h2>Login</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleLoginSubmit}>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e, 'login')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, 'login')}
                    required
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          ) : (
            <div>
              <h2>Register</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleRegisterSubmit}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={registerData.username}
                    onChange={(e) => handleChange(e, 'register')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerData.email}
                    onChange={(e) => handleChange(e, 'register')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={(e) => handleChange(e, 'register')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="repeatPassword">Repeat Password:</label>
                  <input
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={registerData.repeatPassword}
                    onChange={(e) => handleChange(e, 'register')}
                    required
                  />
                </div>
                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account? <button onClick={() => setIsRegistering(false)}>Login here</button>
              </p>
            </div>
          )}

          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsRegistering(true)}>Register here</button>
          </p>
        </div>
      ) : (
        <div>
          <p>Welcome, {registerData.username}! You are signed in.</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      {/* Image Display (This will always be visible regardless of login or registration) */}
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

export default LandingPage;
