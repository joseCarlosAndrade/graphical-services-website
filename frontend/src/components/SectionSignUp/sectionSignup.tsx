import React from 'react'
import './sectionsignup.css';
import { google, facebook, apple } from '../../assets';

function SectionSignup() { 
  return (
    <>
      <section className="signup signupDark">

        <div className="signup__div">
          <div className="signup__div_line"></div>
          <div className="signup__div_text">Sign up with your social network</div>
          <div className="signup__div_line"></div>
        </div>
        
        <div className="signup__social">
          <img className="signup__social__icon" src={facebook} alt=""/>
          <img className="signup__social__icon" src={google} alt=""/>
          <img className="signup__social__icon" src={apple} alt=""/>
        </div>
        
        <div className="signup__div">
          <div className="signup__div_line"></div>
          <div className="signup__div_text">Sign up with email</div>
          <div className="signup__div_line"></div>
        </div>
        
        <div className="signup__field">
          <div className="signup__field__email">
            <div className="signup__field__email_text">Email</div>
            <input className="signup__field__email_input" placeholder='Enter your email id'></input>
          </div>
          <div className='signup__field__name'>
            <div className="signup__field__name_first">
              <div className="signup__field__name_first_text">Nome</div>
              <input className="signup__field__name_first_input" placeholder='Enter your first name'></input>
            </div>
            <div className="signup__field__name_second">
              <div className="signup__field__name_second_text">Sobrenome</div>
              <input className="signup__field__name_second_input" placeholder='Enter your last name'></input>
            </div>
          </div>
          <div className='signup__field__password'>
            <div className="signup__field__password_first">
              <div className="signup__field__password_first_text">Senha</div>
              <input className="signup__field__password_first_input" placeholder='Enter your password'></input>
            </div>
            <div className="signup__field__password_second">
              <div className="signup__field__password_second_text">Confirmar Senha</div>
              <input className="signup__field__password_second_input" placeholder='Confirm your password'></input>
            </div>
          </div>
          <div className='signup__field__terms'>
            <input className='signup__field__terms_checkbox' type='checkbox'></input>
            <div className='signup__field__terms_text'>I agree to the Terms of Use and Privacy Notice</div>
          </div>
        </div>
        <button className='signup__button'>Sign Up</button>
      </section>
    </>
  )
}

export default SectionSignup