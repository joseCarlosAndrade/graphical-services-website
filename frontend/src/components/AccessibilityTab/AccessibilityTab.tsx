import React, { useEffect, useState } from 'react'
import './accessibilitytab.css';

import { lensDown, lensUp, darkThemeIcon, signLanguageIcon, accessIcon } from '../../assets';

interface AccessibilityProps {
  currentTheme: string,
  setCurrentTheme : (args0: string) => void
}

function AccessibilityTab( { currentTheme, setCurrentTheme} : AccessibilityProps) {
  // const [theme, setTheme] = useState('light');

  // event handler do botao do modo noturno
  const changeTheme = () => {
    if (currentTheme==='light') {
      setCurrentTheme('dark');
    } else {
      setCurrentTheme('light')
    }
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
    } else {
      document.documentElement.style.setProperty('--main-color', 'var(--header-light)');
      document.documentElement.style.setProperty('--button-color', 'var(--button-light)');
      document.documentElement.style.setProperty('--blue', 'var(--blue-light)');
      document.documentElement.style.setProperty('--bg-color', 'var(--bg-light)');
      document.documentElement.style.setProperty('--main-text-color', 'var(--text-light)');
      document.documentElement.style.setProperty('--button-red-hover', 'var(--header-light)');
    }
  }, [currentTheme]);
  
  return (
    <>
        <div className='accessContainer'>
            <div className='accessContainer--buttons'>
                <img className='signlLanguageIcon' src={signLanguageIcon} alt="Mãos indicando libras" />

                <button className='nightModeButton' onClick={ changeTheme}> <img className='nightModeIcon' src={darkThemeIcon.toString()} alt="Simbolo modo noturno" /> Modo noturno</button>

                <button className='increaseFontButton'> <img className='increaseFontIcon' src={lensUp.toString()} alt="Lupa com aumento" />Aumentar fonte</button>

                <button className='decreaseFontButton'> <img className='decreaseFontIcon' src={lensDown.toString()} alt="Lupa com diminuição" />Diminuir fonte</button>

            </div>
            <div className='accessContainer--border'>
                <img src={accessIcon.toString()} alt="Accessibilidade" />
            </div>

        </div>
    </>
  )
}

export default AccessibilityTab;