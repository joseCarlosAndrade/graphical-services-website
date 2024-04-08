import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionLogin } from '../../components';
import './loginpage.css';

interface LoginProps {
  theme: string,
  setTheme: (args0: string) => void
  action: string,
  setAction: (args0: string) => void
}

function LoginPage({ theme, setTheme, action, setAction }: LoginProps) {
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
      <Header currentAction={action} setCurrentAction={setAction}></Header>

      <SectionLogin currentAction={action} setCurrentAction={setAction}></SectionLogin>

      <Footer></Footer>

    </>
  )
}

export default LoginPage