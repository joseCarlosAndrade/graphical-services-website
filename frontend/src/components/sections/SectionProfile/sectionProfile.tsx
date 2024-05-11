import React from 'react'
import './sectionprofile.css';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../services';
import { FormField } from '../../index'
import { profileDefaultImg } from '../../../assets/index'

interface SectionProfileProps {
  currentAction: string
  setCurrentAction: (args0: string) => void
  pageFont: number
}

function SectionProfile({ currentAction, setCurrentAction, pageFont }: SectionProfileProps) {
  const [selector, setSelector] = useState('editProfile'); // can be 'editProfile' or 'seeRequests'

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

  const updateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  }

  return (
    <>
      <div className='sectionProfileContainer' style={{ fontSize: `${pageFont}rem` }}>
        <div className="profile">
          <img className='profile__img' src={profileDefaultImg}></img>
          <div className='profile__name'>Carlos Fernandez Vasquez</div>
        </div>

        <div className="profile__container">
          <div className='profile__buttons'>
            <button style={{ fontSize: `${pageFont}rem` }} className='profile__buttons_selector' onClick={() => setSelector('editProfile')}>Edit Profile</button>
            <button style={{ fontSize: `${pageFont}rem` }} className='profile__buttons_selector' onClick={() => setSelector('seeRequests')}>See Your Requests</button>
          </div>
          {
            selector === 'editProfile' ?
              <>
                <form className="update" onSubmit={updateProfile}>
                  <div className="update__field">
                    <FormField
                      action='update'
                      type='email'
                      label='Email'
                      placeholder='Enter your email'
                      value={formData.email}
                      onChange={e => handleInputChange(e, 'email')}
                    />
                    <FormField
                      action='update'
                      type='name_first'
                      label='Nome'
                      placeholder='Enter your first name'
                      value={formData.firstName}
                      onChange={e => handleInputChange(e, 'firstName')}
                    />
                    <FormField
                      action='update'
                      type='name_second'
                      label='Sobrenome'
                      placeholder='Enter your last name'
                      value={formData.lastName}
                      onChange={e => handleInputChange(e, 'lastName')}
                    />
                    <FormField
                      action='update'
                      type='password_first'
                      label='Senha'
                      placeholder='Enter your password'
                      value={formData.password}
                      onChange={e => handleInputChange(e, 'password')}
                    />
                    <FormField
                      action='update'
                      type='password_second'
                      label='Confirmar Senha'
                      placeholder='Confirm your password'
                      value={formData.confirmPassword}
                      onChange={e => handleInputChange(e, 'confirmPassword')}
                    />
                  </div>
                  {formError ? <div className="errorMessage">{formError}</div> : <div className="hide"></div>}
                  {formSuccess ? <div className="successMessage">{formSuccess}</div> : <div className="hide"></div>}
                  <button style={{ fontSize: `${pageFont}rem` }} type="submit" className='update__submit__button'>Update info</button>
                </form>
              </>
              :
              <>
                <div className='requests__field'>
                  My requests
                </div>
              </>
          }
        </div>
      </div>

    </>
  )
}

export default SectionProfile