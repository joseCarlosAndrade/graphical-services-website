import React from 'react'
import { useState, useEffect } from 'react';
import { sessionAuth, adminAuth } from '../../services';
import { deleteCookie } from '../../utils/cookie';
import './header.css';
import { mainLogoWhite, menuWhite, closeMenuWhite } from './../../assets';
import { Link } from 'react-router-dom'
import MobileMenu from '../MobileMenu/MobileMenu';

export interface HeaderProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void,
  headerFontSize: number,
  logged?: boolean,
  currentPage? : string
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const logged = await sessionAuth();
      setLoggedIn(logged);
      
      if (logged) {
        const admin = await adminAuth();
        setIsAdmin(admin);
      }

      setIsLoading(false);
    }

    fetchDataAsync();
  }, [])

  const logOut = () => {
    deleteCookie('token');
    setLoggedIn(false);
    // window.location.reload()
  }

  // mobile menu
  const [toggle, setToggle] = useState(true); // when false, close button is shown

  return (
    <>

      <header role="banner">
        {/* <div className="header--logo">Logo</div> */}
        <Link role="button" to='/'>
          <img src={mainLogoWhite} alt="Graphical Services" />
        </Link>
        <div className='header--mobileMenu'>
          <div role="button" onClick={() => {
            toggle ? document.querySelector('.mobile-menu--container')?.classList.add('slide') :
            document.querySelector('.mobile-menu--container')?.classList.remove('slide');
            setToggle(!toggle);

          }}> <img className='header--mobileMenu' src=
            // whether to show or not the menu
            {toggle ? menuWhite.toString() : closeMenuWhite.toString()} alt="Menu Icon" /></div>
          {
            
            <>
              <MobileMenu
                currentAction={currentAction}
                setCurrentAction={setCurrentAction}
                headerFontSize={headerFontSize}
                logged={logged}
                logOut={logOut}
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                changeAction={changeAction}
              ></MobileMenu>
            </>
          }
        </div>

        <div role="menubar" className={`header--navbar`} >
          {isLoading ? <></> :
            <>
              <Link to='/products-page' style={{ textDecoration: 'none' }}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif", textDecoration: "none" }} className="header--navbar--button products" >Produtos   </button>
              </Link>
              <Link to='/service-page' style={{ textDecoration: 'none' }}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button services" >Serviços  </button>
              </Link>
              <Link to='/quem-somos-page' style={{ textDecoration: 'none' }}>
                <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button whoarewe" >Quem somos </button>
              </Link>
             
              {loggedIn === true ?
                <>
                   {isAdmin ? 
                    <Link to='/quoting' style={{ textDecoration: 'none' }}>
                      <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button quoting" >Cotar</button>
                    </Link> :
                    <Link to='/sendfile' style={{ textDecoration: 'none' }}>
                      <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button sendfile" >Enviar arquivo</button>
                    </Link> 
                    }
                  
                  <Link to='/profile' style={{ textDecoration: 'none' }}>
                    <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button" >Perfil</button>
                  </Link>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="header--navbar--button-login" onClick={logOut} >
                      Log Out </button>
                  </Link>
                </> :
                <>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
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