import { getCookie } from "../utils/cookie";

const getUserRequests = async (id: string) => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const res = await fetch(`http://localhost:8080/admin/requests/${id}`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        const resObject = await res.json();
        if (res.status === 200) {
            return resObject
        } else {
            console.error(resObject)
            return false;
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false;
    }
};

export default getUserRequests