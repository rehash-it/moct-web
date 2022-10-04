import axios from "axios"
import { host } from "../../../config/config"
import { getHeaders } from "../../../config/headers"

export const checkAdmin = async (push) => {
    try {
        const res = await axios.post(host + 'checkAdmin', {}, getHeaders())
    }
    catch (err) {
        push('/login')
    }
}
export const checkToken = async () => {
    try {
        const token = sessionStorage.getItem('x-auth-token') ? true : false
        return token && await (await axios.post(host + 'checkAdmin', {}, getHeaders())).status === 200
    }
    catch (err) {
        console.log(err)
        return false
    }
}