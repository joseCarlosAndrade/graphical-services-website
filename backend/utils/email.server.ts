import { initializeApp } from "firebase/app";
import { applyActionCode, getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseConfig } from "../firebase";

initializeApp(firebaseConfig);

export async function verify(oobCode: string) {
    const auth = getAuth();
    const user = auth.currentUser
    if (user) {
        try {
            await applyActionCode(auth, oobCode)
            // console.log(user?.email, ' ', user?.displayName)
            return { email: user?.email, id:user.uid, displayName: user?.displayName, status: 200 }
        } catch (error: any) {
            console.error('Error verifying email:', error);
            return { message: 'Failed', status: 400 }
        }
    } else {
        return { message: 'Failed', status: 400 }
    }
}