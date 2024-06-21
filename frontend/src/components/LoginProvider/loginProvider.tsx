import React from 'react'
import './loginProvider.css';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { BACKEND_IP, auth } from '../../services';
import { setCookie } from '../../utils';

interface LoginProviderProps {
  iconSrc: string
  loginProvider: "google" | "facebook"
}

function LoginProvider({ iconSrc, loginProvider }: LoginProviderProps) {
  // auth.useDeviceLanguage();

  // não está funcionando!!!!!!!!!!!!!!!!!!!!!!!!!!
  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("user:", user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        if (credential != null) {
          const idToken = credential.idToken;

          console.log("idToken", idToken);
        }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        // ...
        console.log(errorMessage);
      });

  }

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
          const id_token = credential.idToken;
          // IdP data available using getAdditionalUserInfo(result)
          // ...

          const body = {
            id_token: id_token
          }
          const res = await fetch(`http://${BACKEND_IP}:8080/loginGoogle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })

          console.log("response:", res);
          if (res.status === 200) {
            const session = await res.json()

            setCookie('token', session.token)

            // setting in localstorage just to maintain header in logged state 
            localStorage.setItem('logged', JSON.stringify(true));

            window.location.href = "/graphical-services-website#/";
          } else {
            console.error("Something went wrong, try again!");
          }
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.error(errorCode, errorMessage);
      });
  }

  const loginFunction = () => {
    if (loginProvider === "google") {
      loginWithGoogle();
    } else if (loginProvider === "facebook") {
      loginWithFacebook();
    }
  }

  return (
    <>
      <button  type="button" className="login__social_button" onClick={loginFunction}>
        <img className="login__social_button_icon" src={iconSrc} alt="Button for login with google" />
      </button>
    </>
  )
}

export default LoginProvider