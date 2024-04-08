// Create and export a type defining the fields the register form will 
// provide in another new file within app / utils named types.server.ts.

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