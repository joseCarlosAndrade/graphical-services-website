import React from 'react'
import './accessibilitytab.css';

import { lensDown, lensUp, darkThemeIcon, signLanguageIcon, accessIcon } from '../../assets';

function AccessibilityTab() {
  return (
    <>
        <div className='accessContainer'>
            <div className='accessContainer--buttons'>
                <img className='signlLanguageIcon' src={signLanguageIcon} alt="Mãos indicando libras" />
                <button className='nightModeButton'> <img className='nightModeIcon' src={darkThemeIcon.toString()} alt="Simbolo modo noturno" /> Modo noturno</button>
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