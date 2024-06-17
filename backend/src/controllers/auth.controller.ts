import { RegisterForm, LoginForm, UserData } from "../models/form.models"

import { validateName } from './validators.controller'
import bcrypt from 'bcryptjs'

import { auth } from "../services/firebase.service";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithCredential
} from "firebase/auth";
import { createUser } from "./user.controller";
import { prisma } from "../services/prisma.service";

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

export async function loginWithGoogle(id_token: string): Promise<{ status: number, userId?: string, email?: string, message?: string }> {
    const credential = GoogleAuthProvider.credential(id_token);
    try {
        const signInResult = await signInWithCredential(auth, credential);
        if (signInResult.user.email && signInResult.user.displayName) {
            const user: UserData = {
                email: signInResult.user.email,
                displayName: signInResult.user.displayName,
                id: signInResult.user.uid,
            };

            const searchUser = await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            })

            if (!searchUser) {
                // caso não encontre, então cria um novo usuário
                return createUser(user).then((newUser) => {
                    return { userId: newUser.id, email: newUser.email, status: 200 }
                })
            } else {
                return { userId: searchUser.id, email: searchUser.email, status: 200 }
            }
        }
        return { message: "something went wrong!", status: 400 };
    } catch (error) {
        console.log(error);
        return { message: "something went wrong!", status: 400 };
    }
}

