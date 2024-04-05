import React from 'react'
import { Header, Footer, AccessibilityTab, SectionSignup } from '../../components'

interface SignupProps {
  theme : string,
  setTheme : (args0: string) => void
}

function SignupPage( {theme, setTheme} : SignupProps) {
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