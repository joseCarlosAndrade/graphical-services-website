import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { Homepage, SignUp } from './pages';
import { AccessibilityTab } from './components';

function App() {
  return (
    <Router>
      <AccessibilityTab></AccessibilityTab>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
