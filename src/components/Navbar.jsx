import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar component that appears on all pages
 * Contains navigation links for Home, Sign Language Dictionary, and History
 */
const Navbar = () => {
  const location = useLocation();

  /**
   * Helper function to determine if a link is active
   * @param {string} path - The path to check
   * @returns {string} - The CSS class for active or inactive link
   */
  const isActive = (path) => (location.pathname === path ? 'bg-gray-200' : '');

  // Navigation links data
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dictionary', label: 'Dictionary' },
    { path: '/history', label: 'History' },
  ];

  return (
    <nav className="w-full mb-4">
      <div className="flex justify-center space-x-4 py-4">
        {/* Render navigation links dynamically */}
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`px-4 py-2 rounded-md ${isActive(path)}`}
          >
            {label}
          </Link>
        ))}
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;