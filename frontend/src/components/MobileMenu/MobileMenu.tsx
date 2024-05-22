import React from 'react'
import { Link } from 'react-router-dom'
import './mobilemenu.css';
// import { HeaderProps } from '../Header/Header';

export interface MobileMenuProps {
  currentAction: string,
  setCurrentAction: (args0: string) => void,
  headerFontSize: number,
  logged?: boolean,
  logOut : ()=>void,
  loggedIn : boolean,
  changeAction : () => void

}


function MobileMenu({ currentAction, setCurrentAction, headerFontSize, logged, logOut, loggedIn, changeAction }: MobileMenuProps) {
  return (
    <>
    <div className='mobile-menu--container'>
      <Link to='/products-page' style={{textDecoration : 'none'}}>
        <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem` , fontFamily: "DM Sans, sans-serif", textDecoration : "none"}} className="mobile-menu--navbar--button fill" >Produtos   </button>
      </Link>
      <Link to='/service-page' style={{textDecoration : 'none'}}>
        <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem` , fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button" >Serviços  </button>
      </Link>
      <Link to='/quem-somos-page' style={{textDecoration : 'none'}}>
        <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button" >Quem somos </button>
      </Link>
      <Link to='/sendfile' style={{textDecoration : 'none'}}>
        <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button" >Enviar arquivo</button>
      </Link>
      {loggedIn === true ?
        <>
          <Link to='/profile' style={{textDecoration : 'none'}}>
            <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button" >Perfil</button>
          </Link>
          <Link to='/' style={{textDecoration : 'none'}}>
            <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button-login" onClick={logOut} >
              Log Out </button>
          </Link>
        </> :
        <>
          <Link to='/login' style={{textDecoration : 'none'}}>
            <button tabIndex={-1} style={{ fontSize: `${headerFontSize}rem`, fontFamily: "DM Sans, sans-serif" }} className="mobile-menu--navbar--button-login" onClick={changeAction} >
              {currentAction === 'login' ? 'Cadastrar' : 'Entrar'} </button>
          </Link>
        </>
      }
    </div>
    </>
  )
}

export default MobileMenu