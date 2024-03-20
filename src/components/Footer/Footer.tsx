import React from 'react'
import './footer.css'

function Footer() {
  return (
    <>
    <footer>
        <div className="footer--logo-left">
            <img src="" alt="Logo preto e branco"/>
            <p className="footer--logo-left--text">whitepace was created for the new ways we live and work. We make a better workspace around the world</p>
        </div>

        <div className="footer--produtos">
            <p className="footer--produtos-produtos">Produtos</p>
            <p className="footer--produtos-servicos">Serviços</p>
            <p className="footer--produtos-cotiçar">Cotiçar</p>
        </div>

        <div className="footer--resources">
            <div className="footer--resources-google">
                <img className="footer--resources-google-icon" src="" alt=""/>
                <p className="footer--resources-google-text">Correo</p>
            </div>

            <div className="footer--resources-whatsapp">
                <img className="footer--resources-whatsapp-icon" src="" alt=""/>
                <p className="footer--resources-whatsapp-text">Whatsapp</p>
            </div>

            <div className="footer--resources-instagram">
                <img className="footer--resources-instagram-icon" src="" alt=""/>
                <p className="footer--resources-instagram-text">Instagram</p>
            </div>
        </div>

        <div className="footer--empresa">
            <p className="footer--empresa-bold">Empresa</p>
            <p>Quem somos</p>
            <p>Missão</p>
            <p>Visão</p>
        </div>

    </footer>
    </>
  )
}

export default Footer