import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { Homepage, LoginPage } from './pages';

function App() {

  const [theme, setTheme] = useState('light');
  const [action, setAction] = useState('login')
  
  return (
    // <Router>
    <>
      
      <Routes>
        <Route path="/" element={<Homepage theme={theme} setTheme={setTheme} action={action} setAction={setAction} />} />
        <Route path="/login" element={<LoginPage theme={theme} setTheme={setTheme} action={action} setAction={setAction} />} />
      </Routes>
      </>
    // </Router>
  );
}

export default App;
