import { getCookie } from "../utils/cookie";
import { requestModel } from "../types/requestModel";

const createRequest = async (request: requestModel) => {
    try {
        const token = getCookie('token')
        const body = {
            title: request.title,
            url: request.url,
        }
        const res = await fetch(`http://localhost:8080/request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-JWT-Token': token || '' },
            body: JSON.stringify(body),
        });
        const resObject = await res.json();
        if (res.status === 200) {
            console.log(resObject)
            return resObject
        } else {
            console.error(resObject)
            return false
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
}

export default createRequest