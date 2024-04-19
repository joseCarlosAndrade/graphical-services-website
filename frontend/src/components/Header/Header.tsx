import React from 'react'
import './header.css';
import { mainLogoWhite } from './../../assets';
import { Link } from 'react-router-dom'
import DownArrow from '../DownArrow/DownArrow';

interface HeaderProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void,
  headerFontSize : number
}

function Header({ currentAction, setCurrentAction, headerFontSize }: HeaderProps) {
  const changeAction = () => {
    if (currentAction === 'login') {
      setCurrentAction('register');
    } else {
      setCurrentAction('login')
    }
  }
  
  return (
    <>
      <header>
        {/* <div className="header--logo">Logo</div> */}
        <Link to='/'>
          <img src={mainLogoWhite} alt="Graphical Services" />
        </Link>

        <div className={`header--navbar ` } >
          <button style={{fontSize: `${headerFontSize}rem`}} className="header--navbar--button fill" >Produtos  <DownArrow /> </button>
          <button style={{fontSize: `${headerFontSize}rem`}} className="header--navbar--button" >Serviços <DownArrow /> </button>
          <button style={{fontSize: `${headerFontSize}rem`}} className="header--navbar--button" >Quem somos <DownArrow /></button>
          <button style={{fontSize: `${headerFontSize}rem`}} className="header--navbar--button" >???? <DownArrow /> </button>

          <Link to='/login'>
            <button style={{fontSize: `${headerFontSize}rem`}} className="header--navbar--button-login" onClick={changeAction} >
              {currentAction === 'login' ? 'Sign Up' : 'Sign In'} </button>
          </Link>
        </div>
      </header>

    </>
  )
}

export default Header