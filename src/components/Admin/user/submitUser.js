import axios from "axios"
import { host } from "../../../config/config"
import { getHeaders } from "../../../config/headers"
import { removeItem } from "../Controller"

/**
 * @param {*} type 
 * @param {*} data 
 * @param {*} fetch 
 * @param {*} setSave 
 */
export const submitUser = async (type, data, fetch, setSave) => {
    try {
        setSave(s => ({ ...s, process: 'saving...', error: '', success: '' }))
        const res = type === 'past' ? await axios.post(host + 'user', data, getHeaders()) :
            await axios.put(host + 'user/' + data._id, data, getHeaders())
        if (res.status === 200) {
            setSave(s => ({ ...s, process: '', error: '', success: 'saved successfully' }))
            fetch()
        }
        else {
            setSave(s => ({ ...s, process: '', error: 'can not save data please try again later', success: '' }))
        }
    }
    catch (err) {
        console.log(err)
        setSave(s => ({ ...s, process: '', error: 'can not save data please try again', success: '' }))
    }
}