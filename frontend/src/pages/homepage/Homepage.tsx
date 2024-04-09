import React, { useEffect, useState } from 'react';
import { Header, Footer, SectionHomepage, AccessibilityTab } from '../../components';

import './homepage.css';

interface fontSizes {
  accessButtonFont : number,

  headerFont : number,
  homepageFont : number,
  footerFont : number,

  loginFont : number

}

interface HomepageProps {
  theme : string,
  setTheme: (args0: string) => void
  action: string,
  setAction: (args0: string) => void,

  fontSizes : fontSizes,
  setFontsSizes : (args0 : number) => void
}

function Homepage( {theme, setTheme, action, setAction, fontSizes, setFontsSizes} : HomepageProps) {

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
        <AccessibilityTab currentTheme={theme} setCurrentTheme={setTheme} fontSizes={fontSizes} setFontSizes={setFontsSizes}></AccessibilityTab>
        <Header currentAction='register' setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
        
        <SectionHomepage currentTheme={theme} homepageFont={fontSizes.homepageFont}></SectionHomepage>
        
        <Footer footerFont={fontSizes.footerFont}></Footer>
        
    </>
  )
}

export default Homepage