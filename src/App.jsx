import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<SignDictionary />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
        <Route path="/translate" element={<RealtimeTranslate />} />
      </Routes>
    </Router>
  );
};

export default App;
