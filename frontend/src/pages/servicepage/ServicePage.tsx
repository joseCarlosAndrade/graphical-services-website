import React, {useEffect} from 'react'

import { Header, Footer, SectionServicePage, AccessibilityTab } from '../../components';
import {PageProps} from '../../types/interfacePageProps';
import { disenador, impresoraOffset, plastificadora, troquel } from '../../assets';

const services = [
  {
    bottomText: 'PLASTIFICADO',
    sourceImage: plastificadora
  },
  {
    bottomText: 'IMPRESORA OFFSET',
    sourceImage: impresoraOffset
  },
  {
    bottomText: 'DISENADOR GRAFICO',
    sourceImage: disenador
  },
  {
    bottomText: 'TROQUELADO',
    sourceImage: troquel
  }
]

export default function ServicePage({theme, setTheme, fontSizes, setFontsSizes, action, setAction} : PageProps) {
  
  return (
    <>
        <AccessibilityTab 
        currentTheme={theme}
        setCurrentTheme={setTheme}
        fontSizes={fontSizes}
        setFontSizes={setFontsSizes}
        ></AccessibilityTab>
        <Header currentAction='register' setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
        <h1 className='tittleServices'>SERVIÇOS</h1>
        <section className='sectionServices'>
          
        {services.map( (service) => (
            <SectionServicePage   
            bottomText={service.bottomText}
            sourceImage={service.sourceImage} 
            ></SectionServicePage>
        ))
        }
        </section>
        <Footer></Footer>
    </>
  )
}

