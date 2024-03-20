import React from 'react'
import './header.css';

// import logo from './../../assets/graphical-logo.png';
import {mainLogo, downarrow} from './../../assets';
function Header() {
  return (
    <>
        <header>
            {/* <div className="header--logo">Logo</div> */}
            <img src={mainLogo} alt="Graphical Services" />
            <div className="header--navbar">
                <button className="header--navbar--button" >Produtos <img className='downarrow' src={downarrow.toString()} alt="" /> </button>
                <button className="header--navbar--button" >Serviços</button>
                <button className="header--navbar--button" >Quem somos</button>
                <button className="header--navbar--button" >????</button>
                <button className="header--navbar--button-login" >Login</button>
            </div>
        </header>
        
    </>
  )
}

export default Header