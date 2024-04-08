import React, { useEffect, useState } from 'react';
import { Header, Footer, SectionHomepage, AccessibilityTab } from '../../components';

import './homepage.css';
interface HomepageProps {
  theme : string,
  setTheme: (args0: string) => void
  action: string,
  setAction: (args0: string) => void
}

function Homepage( {theme, setTheme, action, setAction} : HomepageProps) {

  // const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      // homepage only changes to dark mode
      // document.documentElement.style.setProperty('--image-width-var', 'var(--image-width-dark)');

    } else {
      // document.documentElement.style.setProperty('--image-width-var', 'var(--image-width-light)');

    }
  }, [theme])

  
  return (
    <>
        <AccessibilityTab currentTheme={theme} setCurrentTheme={setTheme}></AccessibilityTab>
        <Header currentAction='register' setCurrentAction={setAction}></Header>
        
        <SectionHomepage currentTheme={theme}></SectionHomepage>
        
        <Footer></Footer>
        
    </>
  )
}

export default Homepage