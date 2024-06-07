import React from 'react'
import './footer.css'
import { gmail, instagram, whatsapp, mainLogoWhite, facebook } from '../../assets';



function Footer({ footerFont }: { footerFont?: number }) {
    return (
        <>

            <footer style={{fontSize: `${footerFont}rem`}} >
                <div className="footer--logo-left">
                    <img src={mainLogoWhite} alt="Logo preto e branco" className="footer--logo" />
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
                            <img className="footer--resources-icon" src={gmail} alt="Gmail icon" />
                            <p
                                className="footer--resources-text"
                                style={{ fontSize: `${footerFont ? (footerFont < 1 ? 1 : footerFont - 0.3) : 1}rem`}}
                                onClick={() => window.open('mailto:graphical.services.sac@gmail.com')}
                            >
                                Correo
                            </p>
                        </div>

                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={whatsapp} alt="" />
                            <p className="footer--resources-text"
                            style={{ fontSize: `${footerFont ? (footerFont < 1 ? 1 : footerFont - 0.3) : 1}rem` }}
                            onClick={() => window.open('https://wa.me/51965050450')}
                            >Whatsapp</p>
                        </div>

                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={instagram} alt="" />
                            <p className="footer--resources-text"
                            style={{ fontSize: `${footerFont ? (footerFont < 1 ? 1 : footerFont - 0.3) : 1}rem` }}
                            onClick={() => window.open('https://www.instagram.com/graphical.pe?igsh=MXZvOXdmc3dxejVsbQ==')}
                            >Instagram</p>
                        </div>
                        <div className="footer--resources-item">
                            <img className="footer--resources-icon" src={facebook} alt="" />
                            <p className="footer--resources-text"
                            style={{ fontSize: `${footerFont ? (footerFont < 1 ? 1 : footerFont - 0.3) : 1}rem` }}
                            onClick={() => window.open('https://www.facebook.com/profile.php?id=100077175729195')}
                            >Facebook</p>
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