import { useEffect } from 'react';
import { Header, Footer, SectionHomepage, AccessibilityTab } from '../../components';
import { PageProps } from '../../types/interfacePageProps'

import './homepage.css';


function Homepage({ theme, setTheme, action, setAction, fontSizes, setFontsSizes }: PageProps) {

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

