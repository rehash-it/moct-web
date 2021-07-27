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
export const checkToken = async (setToken) => {
    try {
        const token = sessionStorage.getItem('x-auth-token') ? true : false
        if (token) {
            const res = await axios.post(host + 'checkAdmin', {}, getHeaders())
            if (res.status === 200) { setToken(true) }
            else { setToken(false) }
        }
        else {
            setToken(false)
        }
    }
    catch (err) {
        console.log(err)
        setToken(false)
    }
}