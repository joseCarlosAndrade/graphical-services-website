import { auth } from '../services/firebase.service'
import type { RegisterForm, UserDBData, UserData } from '../models/form.models'
import { prisma } from '../services/prisma.service'
import { updatePassword, updateProfile } from 'firebase/auth'

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
            status: 400
        }
    }
    console.log(newUser)
    return { email: newUser.email, displayName: newUser.displayName, id: user.id }
}

export const updateUserInfo = async (user: UserDBData, newInfo: RegisterForm) => {
    const loggedUser = auth.currentUser;
    if (loggedUser) {
        try {
            if (newInfo.password)
                await updatePassword(loggedUser, newInfo.password)
            if (newInfo.firstName) {
                await updateProfile(loggedUser, { displayName: newInfo.firstName + ' ' + newInfo.lastName })
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        displayName: newInfo.firstName + ' ' + newInfo.lastName,
                    },
                });
            }
            return { status: 200, loggedUser }
        } catch (e) {
            console.log("error: ", e);
            return { status: 400, error: 'Some error occurred when updating password' };
        }
    } else {
        return { status: 400, error: 'User not logged In. Try logging in again.' };
    }
}