import React from 'react'
import { useState, useEffect } from 'react';
import { fetchData } from '../../services';
import { deleteCookie } from '../../utils/cookie';
import './header.css';
import { mainLogoWhite } from './../../assets';
import { Link } from 'react-router-dom'
import DownArrow from '../DownArrow/DownArrow';

interface HeaderProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void,
  headerFontSize: number
}

function Header({ currentAction, setCurrentAction, headerFontSize }: HeaderProps) {
  const changeAction = () => {
    if (currentAction === 'login') {
      setCurrentAction('register');
    } else {
      setCurrentAction('login')
    }
  }

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const fetchDataAsync = async () => {
      const logged = await fetchData()
      console.log(logged)
      setLoggedIn(logged)
    }

    fetchDataAsync()
  }, [])

  const logOut = () => {
    deleteCookie('token')
    setLoggedIn(false)
    // window.location.reload()
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
          <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button" >Quem somos <DownArrow /></button>

          {
            loggedIn === true ?
              <>
                <Link to='/sendfile'>
                  <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button" >Enviar arquivo</button>
                </Link>
                <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button" >Perfil</button>
                <Link to='/'>
                  <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button-login" onClick={logOut} >
                    Log Out </button>
                </Link>
              </> :
              <>
                <Link to='/login'>
                  <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button" >Enviar arquivo</button>
                </Link>
                <Link to='/login'>
                  <button style={{ fontSize: `${headerFontSize}rem` }} className="header--navbar--button-login" onClick={changeAction} >
                    {currentAction === 'login' ? 'Sign Up' : 'Sign In'} </button>
                </Link>
              </>
          }
        </div>
      </header>

    </>
  )
}

export default Header