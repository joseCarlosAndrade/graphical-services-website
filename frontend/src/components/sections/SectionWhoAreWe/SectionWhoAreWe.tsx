import React, { ReactNode } from 'react'
import './sectionwhoarewe.css'
import { agenda, caja } from '../../../assets';

interface SectionWhoAreWePageProps {
  somosFontSize: number
}

function SectionWhoAreWePage({ somosFontSize }: SectionWhoAreWePageProps) {

  return (
    <>
      <div className="sectionWhoAreWe">
        <h1 className='tittleSomos'>QUEM SOMOS</h1>
        <article className='containerSomos'>
          <img alt='Agenda' src={agenda} className='imageSomos' />
          <p className='containerText' style={{ fontSize: `${somosFontSize}rem` }}>Contribuir para o crescimento da indústria gráfica nacional, oferecendo serviços gráficos integrais de qualidade diferenciada, no momento oportuno e com a tecnologia adequada.</p>
        </article>

        <article className='containerSomos lastContainer'>
          <p className='containerText' style={{ fontSize: `${somosFontSize}rem` }}>Ser a referência líder na prestação de serviços gráficos; gerando sinergia empresarial com nossos clientes.</p>
          <img alt='Caixa' src={caja} className='imageSomos' />
        </article>

      </div>
    </>
  )
}

export default SectionWhoAreWePage