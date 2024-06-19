import React from 'react'
import './sectionprofile.css';
import { useEffect, useState } from 'react';
import { getUserInfo, sessionAuth } from '../../../services';
import { FormField } from '../../index'
import { profileDefaultImg } from '../../../assets/index'
import { UserDBData } from '../../../types/userModel';
import { requestData, requestModel } from '../../../types/requestModel';

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
  const [userName, setUserName] = useState('')
  const [userRequests, setUserRequests] = useState<requestData[]>([]);
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

  // gets user session on reload
  useEffect(() => {
    const getUserData = async () => {
      const userData = await getUserInfo(); // Immediately invoke the async function
      if (userData) {
        const user = userData.user;
        const requests = userData.requests;
        setUserName(user.displayName);
        setUserRequests(requests.requests);
        setFormData({
          email: user.email,
          password: '',
          confirmPassword: '',
          firstName: user.displayName.substring(0, user.displayName.indexOf(' ')),
          lastName: user.displayName.substring(user.displayName.indexOf(' ') + 1),
        })
      } else {
        setFormError('something went wrong...');
      }
    }

    getUserData();
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
          <img alt='Icone usuario' className='profile__img' src={profileDefaultImg}></img>
          <div className='profile__name'>{userName}</div>
        </div>

        <div className="profile__container">
          <div role="menubar" className='profile__buttons'>
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
                  {formError ? <div role="alert" className="errorMessage">{formError}</div> : <div className="hide"></div>}
                  {formSuccess ? <div role="alert" className="successMessage">{formSuccess}</div> : <div className="hide"></div>}
                  <button style={{ fontSize: `${pageFont}rem` }} type="submit" className='update__submit__button'>Update info</button>
                </form>
              </>
              :
              <>
                <div className='requests__field'>
                  {userRequests.length > 0 ? (
                    userRequests.map((request: requestData) => (
                      <div className='requests__field_item' role="listitem" key={request.id}>
                        <div className='requests__field_item-container'>
                          <div className='requests_title'>{request.title}</div>
                          {/* <div>{request.url}</div> */}
                          {request.price > 0 ? 
                          <div className='requests_price'>R$ {request.price}</div> :
                          <div className='requests_price no-quote'>Não cotado ainda! Aguardar</div>}
                          
                        </div>
                        <button >Baixar</button>
                      </div>
                    ))
                  ) : (
                    <div>No requests found</div>
                  )}
                </div>
              </>
          }
        </div>
      </div>

    </>
  )
}

export default SectionProfile