// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BiArrowBack } from 'react-icons/bi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Here you would typically make an API call to your backend
      // This is just a placeholder for now
      console.log('Registration attempt with:', { name, email, password });
      
      // Simulate API call
      setTimeout(() => {
        // Redirect to login after successful registration
        navigate('/login');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // This would typically trigger Google OAuth flow for registration
    // For now, just log the attempt
    console.log('Attempting to register with Google');
    
    // Placeholder for Google authentication
    // When implemented, this would redirect to Google's auth page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-4">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center text-gray-700 hover:text-gray-900">
            <BiArrowBack className="mr-2" /> Back
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">Register to Bhasa Sanjna</h1>
        
        <div className="bg-gray-200 rounded-lg p-6">
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md transition duration-200"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register an Account'}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <button
            onClick={handleGoogleSignUp}
            className="mt-4 flex items-center justify-center gap-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md transition duration-200"
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;