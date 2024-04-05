import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { Homepage, SignupPage } from './pages';
import { AccessibilityTab } from './components';

function App() {

  const [theme, setTheme] = useState('light');
  
  return (
    // <Router>
    <>
      
      <Routes>
        <Route path="/" element={<Homepage theme={theme} setTheme={setTheme}/>} />
        <Route path="/signup" element={<SignupPage theme={theme} setTheme={setTheme}/>} />
      </Routes>
      </>
    // </Router>
  );
}

export default App;
