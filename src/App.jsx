import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes-frontend';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;