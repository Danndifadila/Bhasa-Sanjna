// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // for debugging
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulasi login berhasil
      console.log('Login dengan:', { email, password });
      
      // Simpan data pengguna dummy di localStorage
      const dummyUser = { 
        id: '123', 
        name: 'Pengguna Test', 
        email: email 
      };
      localStorage.setItem('user', JSON.stringify(dummyUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Tunggu sejenak untuk menampilkan efek loading
      setTimeout(() => {
        // Redirect ke halaman home
        navigate('/home');
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Gagal login');
      setLoading(false);
    }
  };

 // use this, and ProtectedRoute.jsx

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Here you would typically make an API call to your backend
//       // This is just a placeholder for now
//       console.log('Login attempt with:', { email, password });
      
//       // Simulate API call
//       setTimeout(() => {
//         // For now, we'll just redirect to home on any login attempt
//         navigate('/home');
//         setLoading(false);
//       }, 1000);
//     } catch (err) {
//       setError('Failed to log in. Please check your credentials.');
//       setLoading(false);
//     }
//   };

  const handleGoogleSignIn = () => {
    // This would typically trigger Google OAuth flow
    // For now, just log the attempt
    console.log('Attempting to sign in with Google');
    
    // Placeholder for Google authentication
    // When implemented, this would redirect to Google's auth page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Login to Bhasa Sanjna</h1>
        
        <div className="bg-gray-200 rounded-lg p-6">
          <form onSubmit={handleLogin}>
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
              {loading ? 'Logging in...' : 'Login - Continue to Home Page'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/register" className="text-gray-700 hover:underline">
              Or Create an Account
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 flex items-center justify-center gap-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md transition duration-200"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;