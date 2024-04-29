import React from 'react'
import './footer.css'
import { gmail, instagram, whatsapp, mainLogo } from '../../assets';



function Footer( { footerFont} : {footerFont? :  number}) {
    return (
        <>

            <footer style={{fontSize: `${footerFont}rem`}} >
                <div className="footer--logo-left">
                    <img src={mainLogo} alt="Logo preto e branco" className="footer--logo" />
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
                        <p className="footer--empresa-item">Quem somos</p>
                        <p className="footer--empresa-item">Missão</p>
                        <p className="footer--empresa-item">Visão</p>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer