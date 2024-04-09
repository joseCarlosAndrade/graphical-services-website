import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionLogin } from '../../components';
import './loginpage.css';

interface LoginProps {
  theme: string,
  setTheme: (args0: string) => void,
  action: string,
  setAction: (args0: string) => void,
  fontSizes : fontSizes,
  setFontsSizes : (args0 : number) => void,
}

interface fontSizes {
  accessButtonFont : number,

  headerFont : number,
  homepageFont : number,
  footerFont : number,

  loginFont : number,

  

}

function LoginPage({ theme, setTheme, action, setAction, fontSizes , setFontsSizes}: LoginProps) {
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
      <AccessibilityTab currentTheme={theme} setCurrentTheme={setTheme} fontSizes={fontSizes} setFontSizes={setFontsSizes}></AccessibilityTab>
      <Header currentAction={action} setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>

      <SectionLogin currentAction={action} setCurrentAction={setAction}></SectionLogin>

      <Footer></Footer>

    </>
  )
}

export default LoginPage