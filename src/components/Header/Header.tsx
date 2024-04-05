import React from 'react'
import './header.css';
import {mainLogo} from './../../assets';
import { Link} from 'react-router-dom'
import DownArrow from '../DownArrow/DownArrow';

function Header() {
  return (
    <>
        <header>
            {/* <div className="header--logo">Logo</div> */}
            <Link to='/'>
            <img src={mainLogo} alt="Graphical Services" />
            </Link>

            <div className="header--navbar">
                <button className="header--navbar--button fill" >Produtos  <DownArrow/> </button>
                <button className="header--navbar--button" >Serviços <DownArrow/> </button>
                <button className="header--navbar--button" >Quem somos <DownArrow/></button>
                <button className="header--navbar--button" >???? <DownArrow/> </button>
                
                <Link to='/signup'>
                <button className="header--navbar--button-login" >Login  </button>
                </Link>
            </div>
        </header>
        
    </>
  )
}

export default Header