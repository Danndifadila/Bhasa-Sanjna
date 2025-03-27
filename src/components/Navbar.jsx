import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar component that appears on all pages
 * Contains navigation links for Home, Sign Language Dictionary, and History
 */
const Navbar = () => {
  const location = useLocation();
  
  // Helper function to determine if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-200' : '';
  };

  return (
    <nav className="w-full mb-4">
      <div className="flex justify-center space-x-4 py-4">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-md ${isActive('/')}`}
        >
          Home
        </Link>
        <Link 
          to="/dictionary" 
          className={`px-4 py-2 rounded-md ${isActive('/dictionary')}`}
        >
          Sign Language Dictionary
        </Link>
        <Link 
          to="/history" 
          className={`px-4 py-2 rounded-md ${isActive('/history')}`}
        >
          History
        </Link>
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;