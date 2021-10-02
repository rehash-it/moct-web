import axios from 'axios';
import { host } from '../../../config/config';
export const fetchChats = async setState => {

    try {
        setState(s => ({ ...s, loading: true }))
        let admin_id = sessionStorage.getItem('id')
        const fetch = await axios.get(host + '/connection/' + admin_id)
        setState(s => ({ ...s, data: fetch.data, loading: false }))
    }
    catch (err) {
        console.log(err)
        setState(s => ({ ...s, loading: false, error: true }))
    }
}