import React from 'react'
import './sectionlogin.css';
import { google, facebook, apple } from '../../assets';
import { useEffect, useState } from 'react';
import { FormField } from '../../components'

interface SectionLoginProps {
  currentAction: string
  setCurrentAction: (args0: string) => void
}

function SectionLogin({ currentAction, setCurrentAction }: SectionLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
    console.log(formData)
  }
  return (
    <>
      <form className="login">

        <div className="login__div">
          <div className="login__div_line"></div>
          <div className="login__div_text">{currentAction === 'login' ? <>
            Sign In with your Social Network
          </> : <>
            Sign Up with you Social Network
          </>}
          </div>
          <div className="login__div_line"></div>
        </div>

        <div className="login__social">
          <img className="login__social__icon" src={facebook} alt="" />
          <img className="login__social__icon" src={google} alt="" />
          <img className="login__social__icon" src={apple} alt="" />
        </div>

        <div className="login__div">
          <div className="login__div_line"></div>
          <div className="login__div_text">
            {currentAction === 'login' ? <>
              Sign In with email
            </> : <>
              Sign Up with email
            </>}
          </div>
          <div className="login__div_line"></div>
        </div>

        <div className="login__field">
          <FormField
            action='login'
            type='email'
            label='Email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={e => handleInputChange(e, 'email')}
          />
          {
            currentAction === 'register' ? <>
              <div className='register__field__name'>
                <FormField
                  action='register'
                  type='name_first'
                  label='Nome'
                  placeholder='Enter your first name'
                  value={formData.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                />
                <FormField
                  action='register'
                  type='name_second'
                  label='Sobrenome'
                  placeholder='Enter your last name'
                  value={formData.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                />
              </div>
              <div className='register__field__password'>
                <FormField
                  action='register'
                  type='password_first'
                  label='Senha'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={e => handleInputChange(e, 'password')}
                />
                <FormField
                  action='register'
                  type='password_second'
                  label='Confirmar Senha'
                  placeholder='Confirm your password'
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange(e, 'password')}
                />
              </div>
              <div className='register__field__terms'>
                <input className='register__field__terms_checkbox' type='checkbox'></input>
                <div className='register__field__terms_text'>I agree to the Terms of Use and Privacy Notice</div>
              </div>
            </>
              : <>
                <FormField
                  action='login'
                  type='password'
                  label='Senha'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={e => handleInputChange(e, 'password')}
                />
                <div className='register__field__terms'>
                  <input className='register__field__terms_checkbox' type='checkbox'></input>
                  <div className='register__field__terms_text'>Remember me</div>
                </div>
              </>
          }
        </div>
        <button type="submit" className='login__button'>{currentAction === 'login' ? "Sign In" : "Sign Up"}</button>
      </form>
    </>
  )
}

export default SectionLogin