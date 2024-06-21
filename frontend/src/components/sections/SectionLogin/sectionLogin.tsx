import React from 'react'
import './sectionlogin.css';
import { google } from '../../../assets';
import { useEffect, useState } from 'react';
import { FormField, LoginProvider } from '../../index'
import { setCookie } from '../../../utils/cookie';
import { BACKEND_IP, sessionAuth } from '../../../services';
import { sha256 } from 'crypto-hash';

interface SectionLoginProps {
  currentAction: string
  setCurrentAction: (args0: string) => void
  loginFont: number
}

function SectionLogin({ currentAction, setCurrentAction, loginFont }: SectionLoginProps) {
  // const [useCookie, setUseCookie] = useState(true);
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

  // gets user session on reload
  useEffect(() => {
    sessionAuth(); // Immediately invoke the async function
  }, [])

  // when input changes, update formData
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  // if action (login or register) changes, reset the form
  useEffect(() => {
    const newState = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    }
    setFormError('')
    setFormSuccess('')
    setFormData(newState)
  }, [currentAction])

  // if the user starts writing in form, then erases error
  useEffect(() => {
    setFormError('')
    setFormSuccess('')
  }, [formData])

  const register = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setFormError('The two passwords do not match')
      return
    }
    try {
      const hash = await sha256(formData.password)
      const body = {
        email: formData.email,
        password: hash,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }
      const res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log(res);
      if (res.status === 201) {
        console.log('By registering, We are not creating cookie yet.')

        setFormSuccess('Please check your email to verify it!')

        // setting in localstorage just to maintain header in logged state 
        localStorage.setItem('logged', JSON.stringify(true));

        await delay(1500);
        window.location.href = "/graphical-services-website#/";
      } else {
        const message = await res.json()
        setFormError(message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const hash = await sha256(formData.password)
      const body = {
        email: formData.email,
        password: hash,
      }
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 201) {
        const session = await res.json()

        // if (useCookie)
        setCookie('token', session.token)
        // console.log('Cookie set to token: ', session.token)

        setFormSuccess('Success with Login!')

        // setting in localstorage just to maintain header in logged state 
        localStorage.setItem('logged', JSON.stringify(true));

        await delay(1500);
        window.location.href = "/graphical-services-website#/";
      } else {
        const message = await res.json()
        setFormError(message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form className="login" style={{ fontSize: `${loginFont}rem` }} onSubmit={
        currentAction === 'register' ? register : login
      }>

        <div className="login__div">
          <div className="login__div_line"></div>
          <div className="login__div_text">{currentAction === 'login' ? <>
            Entre com sua conta Google
          </> : <>
            Registre-se com sua conta Google
          </>}
          </div>
          <div className="login__div_line"></div>
        </div>

        <div className="login__social">
          <LoginProvider iconSrc={google} loginProvider='google' />
        </div>

        <div className="login__div">
          <div className="login__div_line"></div>
          <div className="login__div_text">
            {currentAction === 'login' ? <>
              Entre com seu email
            </> : <>
              Registre-se com seu email
            </>}
          </div>
          <div className="login__div_line"></div>
        </div>

        <div className="login__field">
          <div className='register__field__email'>
            <FormField
              action='login'
              type='email'
              label='Email'
              placeholder='Digite seu email'
              value={formData.email}
              onChange={e => handleInputChange(e, 'email')}
            />
          </div>
          {
            currentAction === 'register' ? <>
              <div className='register__field__name'>
                <FormField
                  action='register'
                  type='name_first'
                  label='Nome'
                  placeholder='Digite seu nome'
                  value={formData.firstName}
                  onChange={e => handleInputChange(e, 'firstName')}
                />
                <FormField
                  action='register'
                  type='name_second'
                  label='Sobrenome'
                  placeholder='Digite seu sobrenome'
                  value={formData.lastName}
                  onChange={e => handleInputChange(e, 'lastName')}
                />
              </div>
              <div className='register__field__password'>
                <FormField
                  action='register'
                  type='password_first'
                  label='Senha'
                  placeholder='Digite sua senha'
                  value={formData.password}
                  onChange={e => handleInputChange(e, 'password')}
                />
                <FormField
                  action='register'
                  type='password_second'
                  label='Confirmar Senha'
                  placeholder='Confirme sua senha'
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange(e, 'confirmPassword')}
                />
              </div>
              <div className='register__field__terms'>
                <input className='register__field__terms_checkbox' type='checkbox'></input>
                <div className='register__field__terms_text'>Li e aceito os termos de política e privacidade.</div>
              </div>
            </>
              : <>
                <FormField
                  action='login'
                  type='password'
                  label='Senha'
                  placeholder='Digite sua senha'
                  value={formData.password}
                  onChange={e => handleInputChange(e, 'password')}
                />
                <div className='register__field__terms'>
                  {/* <input className='register__field__terms_checkbox' type='checkbox' checked onChange={() => {
                    useCookie === true ? setUseCookie(true) : setUseCookie(false);
                  }}></input> */}
                  {/* <div className='register__field__terms_text'>Lembrar de mim</div> */}
                </div>
              </>
          }
        </div>
        {formError ? <div role="alert" className="errorMessage">{formError}</div> : <div className="hide"></div>}
        {formSuccess ? <div role="alert" className="successMessage">{formSuccess}</div> : <div className="hide"></div>}
        <button style={{ fontSize: `${loginFont}rem` }} type="submit" className='login__button'>{currentAction === 'login' ? "Entrar" : "Cadastrar"}</button>
      </form>
    </>
  )
}

export default SectionLogin