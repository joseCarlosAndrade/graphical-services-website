import React, { ReactNode } from 'react'
//import { useState } from 'react'
import './sectionservicepage.css'
import { Card } from '../../index'

import { disenador, impresoraOffset, plastificadora, troquel } from '../../../assets';

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
              ></Card>
            ))
          }
        </section>
      </div>
    </>
  )
}

export default SectionServicePage