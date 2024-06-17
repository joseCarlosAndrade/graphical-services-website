export type RegisterForm = {
    email: string
    password: string
    firstName: string
    lastName: string
}

export type LoginForm = {
    email: string
    password: string
}

export type UserData = {
    email: string
    displayName: string
    id: string
}

export type UserDBData = {
    email: string
    displayName: string
    id: string
    reqCount : number
    role: string
}