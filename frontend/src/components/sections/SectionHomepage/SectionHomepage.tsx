import React, { useState, useEffect } from 'react';
import './sectionhomepage.css';
import { machine, troquelado, artwork , alejandra, bermanlab, danper, dolceBrown, ecovalle, marinis, morenaBoutique } from '../../../assets';

interface HomepageProps {
  currentTheme: string,
  homepageFont?: number
}

function SectionHomepage({ currentTheme, homepageFont }: HomepageProps) {
  const fontSizeTitle = homepageFont !== undefined ? `${homepageFont + 2}rem` : '1rem';

    const images = [machine, troquelado, artwork];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 8000);
  
      return () => clearInterval(intervalId);
    }, [images.length]);

  return (
    <>
      <section className="homepage">
        <div className="homepage--slide">
          {/* <img className="homepage--slide-image" src={machine} alt="Máquina usada pela empresa" /> */}
        <img className="homepage--slide-image" src={images[currentImageIndex]} alt="Máquina usada pela empresa"/>

          <div className="homepage--slide-leftbutton"></div>
          <div className="homepage--slide-rightbutton"></div>
        </div>

        <div style={{ fontSize: `${homepageFont}rem` }} className="homepage--text">
        Trabalhamos com uma ampla variedade de serviços de impressão nos tipos de papel mais comerciais e especiais. Realizamos serviços de impressão de folhetos, catálogos, cartões de visita, flyers, panfletos triplos, calendários, banners, adesivos e muito mais. Todos os nossos trabalhos têm garantia de satisfação do cliente.
        Ao longo dos anos trabalhando no mundo gráfico, conquistamos algumas marcas que confiam plenamente em nós, como: Marinis's, Alejandra Tafur, Bermanlab, Doce Brown, Casteñeda, Morena boutique e Dasso.
        </div>
        <div className='homepage--section-image-logo'>
          
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={alejandra}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo homepage--image-logo-none' src={bermanlab}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={danper}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={dolceBrown}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={ecovalle}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={marinis}></img>
          {/*eslint-disable-next-line */}
          <img className='homepage--image-logo' src={morenaBoutique}></img>
        </div>

        <div style={{ fontSize: `${homepageFont}rem` }} className="homepage--text homepage--last-text">
        <div style={{ fontSize: `${fontSizeTitle}rem` }}  className='homepage--text-title'>Somos seu melhor aliado estratégico!</div><p></p>
        Na GRAPHICAL, nosso objetivo é fornecer soluções gráficas adaptadas às necessidades de nossos clientes. Temos o respaldo de um sólido histórico de 14 anos que nos permite oferecer uma gama de serviços, produtos, soluções personalizadas e profissionais para todos os seus projetos.
        Explore nossos serviços e produtos. Descubra como podemos transformar suas ideias em impressões perfeitas.
        </div>

      </section>
    </>
  )
}

export default SectionHomepage