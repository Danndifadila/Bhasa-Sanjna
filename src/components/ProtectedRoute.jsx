// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// for debugging
const ProtectedRoute = ({ children }) => {
    // Cek apakah user sudah login dari localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      // Redirect ke halaman login jika belum login
      return <Navigate to="/login" />;
    }
    
    return children;
  };

// use this, and Login.jsx

// const ProtectedRoute = ({ children }) => {
//   const { currentUser } = useAuth();
  
//   if (!currentUser) {
//     // Redirect to login page if user is not logged in
//     return <Navigate to="/login" />;
//   }
  
//   return children;
// };

export default ProtectedRoute;