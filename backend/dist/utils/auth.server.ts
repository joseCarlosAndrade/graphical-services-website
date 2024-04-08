import { prisma } from "./prisma.server"
import { createUser } from "./user.server"
import { RegisterForm, LoginForm } from "./types.server"
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import bcrypt from 'bcryptjs'


export async function createUserSession(userId: string, redirectTo: string) {
    const expirationTime = new Date(new Date().getTime() + 60 * 60 * 24 * 30)
    setCookie('auth', JSON.stringify({
        name: 'user-session',
        id: userId,
    }), { expires: expirationTime })
    // redirect(redirectTo)
}

export async function register(user: RegisterForm) {
    const exists = await prisma.user.count({ where: { email: user.email } })
    if (exists) {
        return JSON.stringify({ error: `User already exists with that email`, status: 400 })
    }

    const newUser = await createUser(user)
    if (!newUser) {
        return JSON.stringify(
            {
                error: `Something went wrong trying to create a new user.`,
                fields: { email: user.email, password: user.password },
                status: 400
            },
        )
    }

    // create user session with cookie
    return createUserSession(newUser.id, '/');
}

export async function login({ email, password }: LoginForm) {
    // queries for a user with a matching email.
    const user = await prisma.user.findUnique({
        where: { email },
    })

    // returns a null value if no user is found or 
    // the password provided doesn't match the hashed value in the database.
    if (!user || !(await bcrypt.compare(password, user.password)))
        return JSON.stringify({ error: `Incorrect login`, status: 400 })

    // creates user session with cookie if all goes well
    return createUserSession(user.id, "/");
}

// This is a lot of new functionality.Here is what the functions above will do:
// requireUserId checks for a user's session. If one exists, it is a success and just returns the userId. If it fails, however, it will redirect the user to the login screen.
// getUserId returns the current user's id from the session storage.
// getUser returns the whole user document associated with the current session.If one is not found, the user is logged out.
// logout destroys the current session and redirects the user to the login screen.
export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
    const session = JSON.parse(getCookie('auth') || '')
    const userId = session.id || ''
    if (!userId || typeof userId !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        // throw redirect(`/login?${searchParams}`)
    }
    return userId
}

async function getUserId() {
    const session = JSON.parse(getCookie('auth') || '')
    if (!session || typeof session.id !== 'string') return null
    return session.id
}

export async function getUser() {
    const userId = await getUserId()
    if (typeof userId !== 'string') {
        return null
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, profile: true },
        })
        return user
    } catch {
        throw logout()
    }
}

export async function logout() {
    removeCookie('auth')
    // return redirect('/signup')
}