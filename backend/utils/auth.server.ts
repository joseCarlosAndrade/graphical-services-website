import { RegisterForm, LoginForm } from "./types.server"

import { validateName } from './validators.server'
import bcrypt from 'bcryptjs'

import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signOut,
    updateProfile,
} from "firebase/auth";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()

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
    // // returns a null value if no user is found or 
    // // the password provided doesn't match the hashed value in the database.
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return { message: `Incorrect login`, status: 400 }
    // }

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

// export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
//     const session = JSON.parse(getCookie('auth') || '')
//     const userId = session.id || ''
//     if (!userId || typeof userId !== 'string') {
//         const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
//         // throw redirect(`/login?${searchParams}`)
//     }
//     return userId
// }

// async function getUserId() {
//     const session = JSON.parse(getCookie('auth') || '')
//     if (!session || typeof session.id !== 'string') return null
//     return session.id
// }

// export async function getUser() {
//     const userId = await getUserId()
//     if (typeof userId !== 'string') {
//         return null
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             select: { id: true, email: true, profile: true },
//         })
//         return user
//     } catch {
//         throw logout()
//     }
// }