import { getCookie } from "../utils/cookie";
import { BACKEND_IP } from "./backendapi";

const sessionAuth = async () => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const res = await fetch(`http://${BACKEND_IP}:8080/protected`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        const resObject = await res.json();
        if (res.status === 200) {
            console.log(resObject)
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

export default sessionAuth