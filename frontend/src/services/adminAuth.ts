import { getCookie } from "../utils/cookie";
import { BACKEND_IP } from "./backendapi";

const adminAuth = async () => {
    console.log("IP DO BACKEND: ", BACKEND_IP);
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const res = await fetch(`http://${BACKEND_IP}:8080/admin/auth`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        const resObject = await res.json();
        if (res.status === 200) {
            console.log(resObject.message)
            return true
        } else {
            console.error(resObject.message)
            return false
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
};

export default adminAuth