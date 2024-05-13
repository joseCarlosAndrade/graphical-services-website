import React, { useEffect } from 'react'
import './accessibilitytab.css';

import { lensDown, lensUp, darkThemeIcon, signLanguageIcon, accessIcon } from '../../assets';

import {  fontSizes } from '../../types/interfacePageProps'
import { setCSSVar } from '../../utils';



interface AccessibilityProps {
  currentTheme?: string,
  setCurrentTheme : (args0: string) => void,
  fontSizes ?: fontSizes,
  setFontSizes : (args0 : number)=> void
  
}

function AccessibilityTab( { currentTheme, setCurrentTheme, fontSizes, setFontSizes} : AccessibilityProps) {
  // const [theme, setTheme] = useState('light');

  // event handler do botao do modo noturno
  const changeThemeCallback = () => {
    if (currentTheme==='light') {
      setCurrentTheme('dark');
    } else {
      setCurrentTheme('light')
    }
  }

  const increaseFontCallback = () => {
    setFontSizes(1)    ;

  }

  const decreaseFontCallback = () => {
    setFontSizes(0);
  }

  // troca de temas dos componentes genericos (header, background)
  // deve ser feito nesta ordem, pois useEffect sempre executa uma vez no carregamento da pagina
  useEffect(()=> {
    if (currentTheme === 'dark') {
      document.documentElement.style.setProperty('--main-color', 'var(--header-dark)');
      document.documentElement.style.setProperty('--button-color', 'var(--button-dark)');
      document.documentElement.style.setProperty('--blue', 'var(--button-light)');
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-dark)');
      document.documentElement.style.setProperty('--main-text-color', 'var(--text-dark)');
      document.documentElement.style.setProperty('--button-red-hover', 'var(--button-light)');
      setCSSVar('--text-color-var', 'var(--text-color-dark-white)');
    } else {
      document.documentElement.style.setProperty('--main-color', 'var(--header-light)');
      document.documentElement.style.setProperty('--button-color', 'var(--button-light)');
      document.documentElement.style.setProperty('--blue', 'var(--blue-light)');
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-light)');
      document.documentElement.style.setProperty('--main-text-color', 'var(--text-light)');
      document.documentElement.style.setProperty('--button-red-hover', 'var(--header-light)');
      setCSSVar('--text-color-var', 'var(--text-color-light)');
    }
  }, [currentTheme]);
  
  return (
    <>
        <div className='accessContainer'>
            <div className='accessContainer--buttons'>
                <img className='signlLanguageIcon' src={signLanguageIcon} alt="Mãos indicando libras" />

                <button className='nightModeButton' onClick={ changeThemeCallback}> <img className='nightModeIcon' src={darkThemeIcon.toString()} alt="Simbolo modo noturno" /> Modo noturno</button>

                <button className='increaseFontButton' onClick={increaseFontCallback}> <img className='increaseFontIcon' src={lensUp.toString()} alt="Lupa com aumento" />Aumentar fonte</button>

                <button className='decreaseFontButton' onClick={decreaseFontCallback}> <img className='decreaseFontIcon' src={lensDown.toString()} alt="Lupa com diminuição" />Diminuir fonte</button>

            </div>
            <div className='accessContainer--border'>
                <img src={accessIcon.toString()} alt="Accessibilidade" />
            </div>

        </div>
    </>
  )
}

export default AccessibilityTab;