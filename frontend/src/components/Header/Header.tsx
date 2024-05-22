import React from 'react'
import { useState, useEffect } from 'react';
import { fetchData } from '../../services';
import { deleteCookie } from '../../utils/cookie';
import './header.css';
import { mainLogoWhite } from './../../assets';
import { Link } from 'react-router-dom'
import DownArrow from '../DownArrow/DownArrow';
import VLibras from '@djpfs/react-vlibras';

interface HeaderProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void,
  headerFontSize: number,
  logged?: boolean
}

function Header({ currentAction, setCurrentAction, headerFontSize, logged }: HeaderProps) {
  const changeAction = () => {
    if (currentAction === 'login') {
      setCurrentAction('register');
    } else {
      setCurrentAction('login');
    }
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const logged = await fetchData();
      setLoggedIn(logged);
      setIsLoading(false);
    }

    fetchDataAsync();
  }, [])

  const logOut = () => {
    deleteCookie('token');
    setLoggedIn(false);
    localStorage.removeItem('logged');
    // window.location.reload()
  }

  return (
    <>

      <header>
        {/* <div className="header--logo">Logo</div> */}
        <Link to='/'>
          <img src={mainLogoWhite} alt="Graphical Services" />
        </Link>

        <div className={`header--navbar `} >
          {isLoading ? <></> :
            <>
              <Link to='/products-page' style={{textDecoration : 'none'}}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem` , fontFamily: "DM Sans, sans-serif", textDecoration : "none"}} className="header--navbar--button fill" >Produtos   </button>
              </Link>
              <Link to='/service-page' style={{textDecoration : 'none'}}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem` , fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button" >Serviços  </button>
              </Link>
              <Link to='/quem-somos-page' style={{textDecoration : 'none'}}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button" >Quem somos </button>
              </Link>
              <Link to='/sendfile' style={{textDecoration : 'none'}}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button" >Enviar arquivo</button>
              </Link>
              {loggedIn === true ?
                <>
                  <Link to='/profile' style={{textDecoration : 'none'}}>
                    <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button" >Perfil</button>
                  </Link>
                  <Link to='/' style={{textDecoration : 'none'}}>
                    <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button-login" onClick={logOut} >
                      Log Out </button>
                  </Link>
                </> :
                <>
                  <Link to='/login' style={{textDecoration : 'none'}}>
                    <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button-login" onClick={changeAction} >
                      {currentAction === 'login' ? 'Cadastrar' : 'Entrar'} </button>
                  </Link>
                </>
              }
            </>}
        </div>
      </header>

    </>
  )
}

export default Header