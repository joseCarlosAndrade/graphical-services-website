import { getCookie } from "../utils/cookie";

const adminAuth = async () => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const res = await fetch(`http://localhost:8080/admin/auth`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        const resObject = await res.json();
        if (res.status === 200) {
            console.log(resObject.message)
            return true
        } else {
            console.error(resObject.message)
            window.location.href = "/graphical-services-website#/";
            return false
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
};

export default adminAuth