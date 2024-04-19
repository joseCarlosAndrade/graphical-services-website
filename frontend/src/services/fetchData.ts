import { getCookie } from "../utils/cookie";

const fetchData = async () => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const res = await fetch(`http://localhost:8080/protected`, {
            method: 'GET',
            headers: { 'X-JWT-Token': token || '' },
        });
        const resObject = await res.json();
        console.log(resObject.message)
        return true
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
};

export default fetchData