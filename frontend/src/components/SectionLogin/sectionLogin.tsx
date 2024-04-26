import React from 'react'
import './sectionlogin.css';
import { google, facebook, apple } from '../../assets';
import { useEffect, useState } from 'react';
import { FormField } from '../../components'
import { setCookie } from '../../utils/cookie';
import { fetchData } from '../../services';

interface SectionLoginProps {
  currentAction: string
  setCurrentAction: (args0: string) => void
}

function SectionLogin({ currentAction, setCurrentAction }: SectionLoginProps) {
  const [useCookie, setUseCookie] = useState(true);
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
    fetchData(); // Immediately invoke the async function
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
      const body = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }
      const res = await fetch(`http://localhost:8080/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log(res);
      if (res.status === 201) {
        console.log('By registering, We are not creating cookie yet.')

        setFormSuccess('Please check your email to verify it!')
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
      const body = {
        email: formData.email,
        password: formData.password,
      }
      const res = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 201) {
        const session = await res.json()

        if (useCookie)
          setCookie('token', session.token)
        // console.log('Cookie set to token: ', session.token)

        setFormSuccess('Success with Login!')

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
      <form className="login" onSubmit={
        currentAction === 'register' ? register : login
      }>

        <div className="login__div">
          <div className="login__div_line"></div>
          <div className="login__div_text">{currentAction === 'login' ? <>
            Sign In with your Social Network
          </> : <>
            Sign Up with your Social Network
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
                  onChange={e => handleInputChange(e, 'confirmPassword')}
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
                  <input className='register__field__terms_checkbox' type='checkbox' checked onChange={() => {
                    useCookie === true ? setUseCookie(true) : setUseCookie(false);
                  }}></input>
                  <div className='register__field__terms_text'>Remember me</div>
                </div>
              </>
          }
        </div>
        {formError ? <div className="errorMessage">{formError}</div> : <div className="hide"></div>}
        {formSuccess ? <div className="successMessage">{formSuccess}</div> : <div className="hide"></div>}
        <button type="submit" className='login__button'>{currentAction === 'login' ? "Sign In" : "Sign Up"}</button>
      </form>
    </>
  )
}

export default SectionLogin