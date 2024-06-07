import React, { ReactNode } from 'react'
//import { useState } from 'react'
import './sectionservicepage.css'
import { Card } from '../../index'

import { disenador, impresoraOffset, plastificadora, troquel, cortador} from '../../../assets';

const services = [
  {
    bottomText: 'DISENADOR GRAFICO',
    sourceImage: disenador,
    altText : 'Desenhador'
  },
  {
    bottomText: 'IMPRESORA OFFSET',
    sourceImage: impresoraOffset,
    altText : 'Impressora'
  },
  {
    bottomText: 'PLASTIFICADO',
    sourceImage: plastificadora,
    altText : 'Plastificadora'
  },
  {
    bottomText: 'TROQUELADO',
    sourceImage: troquel,
    altText : 'Troquelado'
  },
  {
    bottomText: 'CORTE DE PAPEL',
    sourceImage: cortador,
    altText : 'Corte de Papel'
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