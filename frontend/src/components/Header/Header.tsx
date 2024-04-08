import React from 'react'
import './header.css';
import { mainLogo } from './../../assets';
import { Link } from 'react-router-dom'
import DownArrow from '../DownArrow/DownArrow';

interface HeaderProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void
}

function Header({ currentAction, setCurrentAction }: HeaderProps) {
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
          <img src={mainLogo} alt="Graphical Services" />
        </Link>

        <div className="header--navbar">
          <button className="header--navbar--button fill" >Produtos  <DownArrow /> </button>
          <button className="header--navbar--button" >Serviços <DownArrow /> </button>
          <button className="header--navbar--button" >Quem somos <DownArrow /></button>
          <button className="header--navbar--button" >???? <DownArrow /> </button>

          <Link to='/login'>
            <button className="header--navbar--button-login" onClick={changeAction} >
              {currentAction === 'login' ? 'Sign Up' : 'Sign In'} </button>
          </Link>
        </div>
      </header>

    </>
  )
}

export default Header