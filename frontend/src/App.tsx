import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { Homepage, LoginPage } from './pages';

interface fontSizes {
  accessButtonFont : number,

  headerFont : number,
  homepageFont : number,
  footerFont : number,

  loginFont : number

}

function App() {

  const [theme, setTheme] = useState('light');
  const [action, setAction] = useState('login')

  // const fontSizesHolder : fontSizes = { // rem sizes
  //   accessButtonFont: 1.2,

  //   headerFont : 0.8,
  //   homepageFont : 0.9,
  //   footerFont : 1,

  //   loginFont : 1

  // }

  const [fontSizesHolder, setFontSizesHolder] = useState<fontSizes>( {
    accessButtonFont: 1.2,

    headerFont : 0.8,
    homepageFont : 0.9,
    footerFont : 1,

    loginFont : 1

  });


  const changeFont = (i : number) => {
    const changeFactor : number = 0.2
    if (i === 1) {
      setFontSizesHolder( {
        accessButtonFont : fontSizesHolder.accessButtonFont + changeFactor,
        headerFont : fontSizesHolder.headerFont + changeFactor,
        homepageFont : fontSizesHolder.homepageFont + changeFactor,
        footerFont : fontSizesHolder.footerFont + changeFactor,
  
        loginFont : fontSizesHolder.loginFont + changeFactor,
      })
    } else {
      setFontSizesHolder( {
        accessButtonFont : fontSizesHolder.accessButtonFont -changeFactor,
        headerFont : fontSizesHolder.headerFont - changeFactor,
        homepageFont : fontSizesHolder.homepageFont - changeFactor,
        footerFont : fontSizesHolder.footerFont -changeFactor,
  
        loginFont : fontSizesHolder.loginFont -changeFactor,
      })
    }
    
  }

  return (
    // <Router>
    <>
      <Routes>
        <Route path="/" element={
          <Homepage 
            theme={theme} 
            setTheme={setTheme} 
            action={action} 
            setAction={setAction}
            fontSizes={fontSizesHolder} 
            setFontsSizes={changeFont}/>
          } />
        <Route path="/login" element={
          <LoginPage 
            theme={theme} 
            setTheme={setTheme} 
            action={action} 
            setAction={setAction}
            fontSizes={fontSizesHolder}
            setFontsSizes={changeFont} />} />
      </Routes>
      </>
    // </Router>
  );
}

export default App;
