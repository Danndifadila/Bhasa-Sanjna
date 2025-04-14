import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all pages
import Home from './pages/Home';
import SignDictionary from './pages/SignDictionary';
import History from './pages/History';
import HistoryDetail from './pages/HistoryDetail';
import RealtimeTranslate from './pages/RealtimeTranslate';

/**
 * Main App component
 * Defines all routes for the application
 */
const App = () => {
  // Define routes in an array for better scalability and readability
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/dictionary', element: <SignDictionary /> },
    { path: '/history', element: <History /> },
    { path: '/history/:id', element: <HistoryDetail /> },
    { path: '/translate', element: <RealtimeTranslate /> },
  ];

  return (
    <Router>
      <Routes>
        {/* Map through the routes array to dynamically create Route components */}
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
