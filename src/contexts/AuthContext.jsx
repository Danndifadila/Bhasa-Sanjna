// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function would check if the user is already logged in
  // For example, by checking local storage or a token
  useEffect(() => {
    const checkUserStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkUserStatus();
  }, []);

  // Login function (to be implemented with your backend)
  const login = async (email, password) => {
    // This is a placeholder for your actual login API call
    // In a real app, you would call your backend here
    try {
      // Simulate successful login
      const userData = { id: '123', email, name: 'User' };
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Google login function (to be implemented with your backend)
  const googleLogin = async () => {
    // This is a placeholder for your actual Google login implementation
    // In a real app, you would handle the OAuth flow
    try {
      // This would typically involve redirecting to Google and then handling the callback
      console.log('Google login flow initiated');
      // After successful Google auth, you would receive user data
      // and store it similar to regular login
    } catch (error) {
      throw new Error('Google login failed');
    }
  };

  // Register function (to be implemented with your backend)
  const register = async (name, email, password) => {
    // This is a placeholder for your actual registration API call
    try {
      // Simulate successful registration
      console.log('User registered:', { name, email });
      // Typically, you might not log the user in immediately after registration
      return { success: true };
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    googleLogin,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};