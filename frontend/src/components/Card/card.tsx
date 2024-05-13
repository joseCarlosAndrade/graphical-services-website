import React, { ReactNode } from 'react'
//import { useState } from 'react'
import './card.css'


interface cardProps {
  bottomText: string, // Puedes usar ReactNode o string, dependiendo de tu caso de uso
  sourceImage: string,
}

function card({ bottomText, sourceImage }: cardProps) {

  return (
    <>
      <article className='card--container'>
        <img src={`${sourceImage}`} className='card--image' />
        <p className='card--text'>{bottomText}</p>
      </article>
    </>
  )
}

export default card