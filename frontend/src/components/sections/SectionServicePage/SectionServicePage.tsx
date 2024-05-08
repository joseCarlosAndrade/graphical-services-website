import React, { ReactNode } from 'react'
//import { useState } from 'react'
import './sectionservicepage.css'


interface SectionServicePageProps {
  bottomText: string, // Puedes usar ReactNode o string, dependiendo de tu caso de uso
  sourceImage: string,
}

function SectionServicePage ({bottomText, sourceImage}: SectionServicePageProps) {
  
  return (
    <>
      <article className='container'>
        <img src={`${sourceImage}`} className='imagem'/>
        <p className='childButton'>{bottomText}</p>
      </article>
    </>
  )
}

export default SectionServicePage