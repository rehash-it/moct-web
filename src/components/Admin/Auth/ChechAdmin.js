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