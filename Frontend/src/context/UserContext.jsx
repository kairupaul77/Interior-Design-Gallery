import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [current_user, setCurrentUser] = useState(null);

  // Fetch current user if authToken is available
  useEffect(() => {
    if (authToken) {
      fetchCurrentUser();
    } else {
      // If no authToken, ensure the user is redirected to login
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Fetch current user data from API
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      // Check if the response is JSON
      const data = await response.json();
      if (response.ok && data.email) {
        setCurrentUser(data);
      } else {
        throw new Error("Failed to fetch user data.");
      }
    } catch (error) {
      setCurrentUser(null);
      toast.error("Failed to fetch user data. Please log in again.");
      navigate("/login");
    }
  };

  // Login user
  const login = async (email, password) => {
    toast.loading("Logging you in...");
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (response.ok && data.access_token) {
        toast.dismiss();
        sessionStorage.setItem("token", data.access_token);
        setAuthToken(data.access_token); // Trigger fetchCurrentUser

        toast.success("Successfully Logged in");
        navigate("/home"); // Redirect to profile after login
      } else {
        throw new Error(data.error || "Failed to login");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Failed to login");
    }
  };

  // Logout user
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUser(null);
    toast.success("Successfully Logged out");
    navigate("/"); // Redirect to home after logout
  };

  // Update user profile (placeholder function)
  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // Data to pass to the context
  const data = {
    authToken,
    login,
    current_user,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
