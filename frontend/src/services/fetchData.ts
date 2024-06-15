import { getCookie } from "../utils/cookie";

const fetchData = async () => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        console.log(token);
        const res = await fetch(`http://localhost:8080/protected`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        if (res.status === 200) {
            const resObject = await res.json();
            console.log(resObject.message)
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
};

export default fetchData