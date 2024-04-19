import { applyActionCode } from 'firebase/auth'
import { auth } from '../services/auth.services'

export async function verify(oobCode: string) {
    const user = auth.currentUser
    if (user) {
        try {
            await applyActionCode(auth, oobCode)
            // console.log(user?.email, ' ', user?.displayName)
            return { email: user?.email, id: user.uid, displayName: user?.displayName, status: 200 }
        } catch (error: any) {
            console.error('Error verifying email:', error);
            return { message: 'Failed', status: 400 }
        }
    } else {
        return { message: 'Failed', status: 400 }
    }
}