import React from 'react'
import './sectionhomepage.css';
import { machine } from '../../../assets';

interface HomepageProps {
  currentTheme: string,
  homepageFont?: number
}

function SectionHomepage({ currentTheme, homepageFont }: HomepageProps) {
  return (
    <>
      <section className="homepage">
        <div className="homepage--slide">
          <img className="homepage--slide-image" src={machine} alt="Máquina usada pela empresa" />

          <div className="homepage--slide-leftbutton"></div>
          <div className="homepage--slide-rightbutton"></div>
        </div>

        <div style={{ fontSize: `${homepageFont}rem` }} className="homepage--text">
        Trabalhamos com uma ampla variedade de serviços de impressão nos tipos de papel mais comerciais e especiais. Realizamos serviços de impressão de folhetos, catálogos, cartões de visita, flyers, panfletos triplos, calendários, banners, adesivos e muito mais. Todos os nossos trabalhos têm garantia de satisfação do cliente.
        Ao longo dos anos trabalhando no mundo gráfico, conquistamos algumas marcas que confiam plenamente em nós, como: Alejandra Tafur, Dolce Brown, Morena Boutique, Dasso e Marini's.
        </div>

      </section>
    </>
  )
}

export default SectionHomepage