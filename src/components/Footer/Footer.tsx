import React from 'react'
import './footer.css'
import { gmail, instagram, whatsapp, mainLogo } from '../../assets';

function Footer() {
    return (
        <>

            <footer>
                <div className="footer--logo-left">
                    <img src={mainLogo} alt="Logo preto e branco" />
                    <p className="footer--logo-left--text">whitepace was created for the <br /> new ways we live and <br /> work. We make a better <br /> workspace around the world</p>
                </div>

                <div className='footer--contents'>
                    <div className="footer--produtos">
                        <p className="footer--produtos-item">Produtos</p>
                        <p className="footer--produtos-item">Serviços</p>
                        <p className="footer--produtos-item">Cotiçar</p>
                    </div>

                    <div className="footer--resources">
                        <p className='footer--resources-bold'>Resources</p>
                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={gmail} alt="" />
                            <p className="footer--resources-text">Correo</p>
                        </div>

                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={whatsapp} alt="" />
                            <p className="footer--resources-text">Whatsapp</p>
                        </div>

                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={instagram} alt="" />
                            <p className="footer--resources-text">Instagram</p>
                        </div>
                    </div>

                    <div className="footer--empresa">
                        <p className="footer--empresa-bold">Empresa</p>
                        <p>Quem somos</p>
                        <p>Missão</p>
                        <p>Visão</p>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer