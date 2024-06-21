import { getCookie } from "../utils/cookie";
import { BACKEND_IP } from "./backendapi";

const updatePrice = async (id: string, price : number) => {
    try {
        const token = getCookie('token')
        // console.log('testing for token: ', token)
        const body = {
            newPrice: price
        }
        const res = await fetch(`/api/admin/request/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-JWT-Token': token || '' },
            body: JSON.stringify(body),
        });
        const resObject = await res.json();
        console.log(resObject);
        if (res.status === 200) {
            return resObject
        } else {
            console.error(resObject)
            window.location.href = "/graphical-services-website#/";
            return false
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return false
    }
};

export default updatePrice