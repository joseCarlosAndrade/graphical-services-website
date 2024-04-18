import { prisma } from "./prisma.server"
import { createUser } from "./user.server"
import { RegisterForm } from "./types.server"

export async function newData(user: RegisterForm) {
    const newUser = await createUser(user)
    if (!newUser) {
        return {
            message: `Something went wrong trying to create a new user.`,
            fields: { email: user.email, password: user.password },
            status: 500
        }
    }
}

export async function findData(email: string) {
    // queries for a user with a matching email.
    const user = await prisma.user.findUnique({
        where: { email },
    })
}

/*
Processo para criar o banco de dados:
1. Enviar o link de verificação de email
2. Usuário clica e é redirecionado para uma das páginas do site.
3. Com o cookie, eu sei o email do usuário
4. Por conseguinte, consigo criar o usuário no banco de dados
*/