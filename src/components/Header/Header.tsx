import React from 'react'
import './header.css';
import {mainLogo} from './../../assets';

import DownArrow from '../DownArrow/DownArrow';

function Header() {
  return (
    <>
        <header>
            {/* <div className="header--logo">Logo</div> */}
            <img src={mainLogo} alt="Graphical Services" />

            <div className="header--navbar">
                <button className="header--navbar--button" >Produtos  <DownArrow/> </button>
                <button className="header--navbar--button" >Serviços <DownArrow/> </button>
                <button className="header--navbar--button" >Quem somos <DownArrow/></button>
                <button className="header--navbar--button" >???? <DownArrow/> </button>
                <button className="header--navbar--button-login" >Login  </button>
            </div>
        </header>
        
    </>
  )
}

export default Header