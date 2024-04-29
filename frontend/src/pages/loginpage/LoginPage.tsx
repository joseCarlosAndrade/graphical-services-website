import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionLogin } from '../../components';
import { PageProps } from '../../types/interfacePageProps'
import './loginpage.css';


function LoginPage({ theme, setTheme, action, setAction, fontSizes , setFontsSizes}: PageProps) {
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

      <SectionLogin currentAction={action} setCurrentAction={setAction} loginFont={fontSizes.loginFont} ></SectionLogin>

      <Footer footerFont={fontSizes.footerFont}></Footer>

    </>
  )
}

export default LoginPage