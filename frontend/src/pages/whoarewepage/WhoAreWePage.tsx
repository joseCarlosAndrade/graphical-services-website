import { useEffect } from 'react';
import { Header, Footer, SectionWhoAreWePage, AccessibilityTab } from '../../components';
import { PageProps } from '../../types/interfacePageProps';
import './whoarewepage.css'
import { setCSSVar } from '../../utils';

export default function WhoAreWe({ theme, setTheme, fontSizes, setFontsSizes, action, setAction }: PageProps) {
  useEffect(() => {
    if (theme === 'dark') {
      //   document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-dark)');
      //   document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-dark)');
      setCSSVar('--text-color', 'var(--text-color-dark)');
      setCSSVar('--text-bold', 'var(--text-bold-dark)');
    } else {
      //   document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-light)');
      //   document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-light)');
      setCSSVar('--text-color', 'var(--text-color-light)');
      setCSSVar('--text-bold', 'var(--text-bold-light)');
    }
  }, [theme])

  
  return (
    <>
      <AccessibilityTab
        currentTheme={theme}
        setCurrentTheme={setTheme}
        fontSizes={fontSizes}
        setFontSizes={setFontsSizes}
      ></AccessibilityTab>
      <Header currentAction='register' setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
      <h1 className='tittleSomos'>QUEM SOMOS</h1>

      <SectionWhoAreWePage somosFontSize={fontSizes.whoAreWePageFont}></SectionWhoAreWePage>

      <Footer footerFont={fontSizes.footerFont}></Footer>
    </>
  )
}

