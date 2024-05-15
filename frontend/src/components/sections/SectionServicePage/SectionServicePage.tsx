import React, { ReactNode } from 'react'
//import { useState } from 'react'
import './sectionservicepage.css'
import { Card } from '../../index'

import { disenador, impresoraOffset, plastificadora, troquel } from '../../../assets';

const services = [
  {
    bottomText: 'PLASTIFICADO',
    sourceImage: plastificadora,
    altText : 'Plastificadora'
  },
  {
    bottomText: 'IMPRESORA OFFSET',
    sourceImage: impresoraOffset,
    altText : 'Impressora'
  },
  {
    bottomText: 'DISENADOR GRAFICO',
    sourceImage: disenador,
    altText : 'Desenhador'
  },
  {
    bottomText: 'TROQUELADO',
    sourceImage: troquel,
    altText : 'Troquelado'
  }
]

interface SectionServicePageProps {
  fontSize: number,
}

function SectionServicePage({ fontSize }: SectionServicePageProps) {

  return (
    <>
      <div className='servicePage' style={{ fontSize: `${fontSize}rem` }}>
        <h1 className='tittleServices'>SERVIÇOS</h1>
        <section className='sectionServices'>
          {
            services.map((service) => (
              <Card
                bottomText={service.bottomText}
                sourceImage={service.sourceImage}
                altText={service.altText}
              ></Card>
            ))
          }
        </section>
      </div>
    </>
  )
}

export default SectionServicePage