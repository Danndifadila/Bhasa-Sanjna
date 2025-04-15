// (Frontend routes)
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignDictionary from './pages/SignDictionary';
import RealtimeTranslate from './pages/RealtimeTranslate';
import HistoryDetail from './pages/HistoryDetail';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: '/dictionary',
    element: <ProtectedRoute><SignDictionary /></ProtectedRoute>,
  },
  {
    path: '/translate',
    element: <ProtectedRoute><RealtimeTranslate /></ProtectedRoute>,
  },
  {
    path: '/history',
    element: <ProtectedRoute><History /></ProtectedRoute>,
  },
  {
    path: '/history/:id',
    element: <ProtectedRoute><HistoryDetail /></ProtectedRoute>,
  },
]);

export default router;