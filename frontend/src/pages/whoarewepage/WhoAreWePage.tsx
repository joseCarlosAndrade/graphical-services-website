import { Header, Footer, SectionWhoAreWePage, AccessibilityTab } from '../../components';
import {PageProps} from '../../types/interfacePageProps';
//import {agenda, caja, cajaTorta, baseTorta, search} from '../../assets';

export default function WhoAreWe({theme, setTheme, fontSizes, setFontsSizes, action, setAction} : PageProps) {
  
  return (
    <>
        <AccessibilityTab 
        currentTheme={theme}
        setCurrentTheme={setTheme}
        fontSizes={fontSizes}
        setFontSizes={setFontsSizes}
        ></AccessibilityTab>
        <Header currentAction='register' setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
        <h1 className='tittleSomos'>Quem Somos</h1>
        <SectionWhoAreWePage somosFontSize={fontSizes.whoAreWePageFont}></SectionWhoAreWePage>

        <Footer></Footer>
    </>
  )
}

