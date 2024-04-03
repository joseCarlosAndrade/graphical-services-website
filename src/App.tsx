import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { Homepage, SignupPage } from './pages';
import { AccessibilityTab } from './components';

function App() {
  return (
    <Router>
      <AccessibilityTab></AccessibilityTab>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
