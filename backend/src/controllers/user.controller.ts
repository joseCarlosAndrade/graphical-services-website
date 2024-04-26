import bcrypt from 'bcryptjs'
import type { UserData } from '../models/form.models'
import { prisma } from '../services/prisma.service'

// 1. It hashes the password provided in the registration form because you should not store it as plain-text.
// 2. It stores the new User document using Prisma.
// 3. It returns the id and email of the new user.
export const createUser = async (user: UserData) => {
    // const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
        data: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
        },
    })

    if (!newUser) {
        return {
            message: `Something went wrong trying to create a new user.`,
            status: 500
        }
    }
    console.log(newUser)
    return { fields: { email: newUser.email, displayName: newUser.displayName }, status: 200 }
}