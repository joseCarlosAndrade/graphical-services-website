import { RegisterForm, LoginForm } from "../models/form.models"

import { validateName } from './validators.controller'
import bcrypt from 'bcryptjs'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../services/auth.services";

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

        return { userId: newUser.uid, email: newUser.email, status: 200 }

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
                return { message: "This email address is invalid.", status: 400 }
            case "auth/user-disabled":
                return { message: "This email address is disabled by the administrator.", status: 400 }
            case "auth/user-not-found":
                return { message: "This email address is not registered.", status: 400 }
            case "auth/invalid-credential":
                return { message: "The password is invalid or the user does not have a password.", status: 400 }
            default:
                return { message: errorMessage, status: 400 };
        }
    }
}

export async function logout() {
    signOut(auth)
}

// This is a lot of new functionality.Here is what the functions above will do:
// requireUserId checks for a user's session. If one exists, it is a success and just returns the userId. If it fails, however, it will redirect the user to the login screen.
// getUserId returns the current user's id from the session storage.
// getUser returns the whole user document associated with the current session.If one is not found, the user is logged out.
// logout destroys the current session and redirects the user to the login screen.
