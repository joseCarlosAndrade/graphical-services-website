import { RegisterForm, LoginForm } from "../models/form.models"

import { validateName } from './validators.controller'
import bcrypt from 'bcryptjs'

import { auth } from "../services/firebase.service";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    AuthProvider
} from "firebase/auth";

export async function register(user: RegisterForm) {

    if (validateName(user.firstName) || validateName(user.lastName)) {
        return { message: 'Please enter values in the name fields', status: 400 }
    }

    try {
        // create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
        )

        const newUser = userCredential.user
        await updateProfile(newUser, {
            displayName: user.firstName + ' ' + user.lastName
        })

        await sendEmailVerification(userCredential.user)
            .then(() => {
                console.log('Email verification sent!');
            })
            .catch(error => {
                console.error('Error sending email verification', error);
            })
        return { userId: newUser.uid, email: newUser.email, status: 200 };
    } catch (err: any) {
        // Handle errors here
        const errorMessage = err.message;
        const errorCode = err.code;

        switch (errorCode) {
            case "auth/weak-password":
                return { message: "The password is too weak.", status: 400 }
            case "auth/email-already-in-use":
                return { message: "This email address is already in use by another account.", status: 400 }
            case "auth/invalid-email":
                return { message: "This email address is invalid.", status: 400 }
            case "auth/operation-not-allowed":
                return { message: "Email/password accounts are not enabled.", status: 400 }
            default:
                return { message: errorMessage, status: 400 };
        }
    }
}

export async function login({ email, password }: LoginForm) {
    try {
        // create a new user with email and password
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        const user = userCredential.user
        // console.log('user has verified email: ', user.emailVerified)
        if (!user.emailVerified)
            return { message: "Please verify your email first!", status: 400 }
        else
            return { userId: user.uid, email: user.email, status: 200 }

    } catch (err: any) {
        // Handle errors here
        const errorMessage = err.message;
        const errorCode = err.code;

        switch (errorCode) {
            case "auth/invalid-email":
                return { message: "This email address is invalid.", status: 400 };
            case "auth/user-disabled":
                return { message: "This email address is disabled by the administrator.", status: 400 };
            case "auth/user-not-found":
                return { message: "This email address is not registered.", status: 400 };
            case "auth/invalid-credential":
                return { message: "The password is invalid or the user does not have a password.", status: 400 };
            default:
                return { message: errorMessage, status: 400 };
        }
    }
}

export async function logout() {
    signOut(auth)
}

export async function loginGoogle(provider: AuthProvider) {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            let token;
            if (credential != null) {
                token = credential.accessToken;
            } else {
                return { message: "Authentication with Google refused.", status: 400 };
            }
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            

            return { googleToken: token, userInfo: user, status: 200 };
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.

            if (errorCode === "auth/account-exists-with-different-credential") {
                // The pending Google credential.
                let pendingCred = error.credential;

                // Step 3: Save the pending credential in temporary storage,

                return { message: `email account: ${email} exists with different credential. Please try another way of signing in.`, status: 400 };
                // Step 4: Let the user know that they already have an account
                // but with a different provider, and let them choose another
                // sign-in method.
            }


            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            return { message: errorMessage, status: 400 };
        });
}