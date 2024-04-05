import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionSignup } from '../../components';
import './signuppage.css';

interface SignupProps {
  theme : string,
  setTheme : (args0: string) => void
}

function SignupPage( {theme, setTheme} : SignupProps) {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-dark)');
      document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-dark)');

    } else {
      document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-light)');
      document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-light)');

    }

  }, [theme])

  return (
    <>
      <AccessibilityTab currentTheme={theme} setCurrentTheme={setTheme}></AccessibilityTab>
        <Header></Header>
        
        <SectionSignup></SectionSignup>
        
        <Footer></Footer>
        
    </>
  )
}

export default SignupPage