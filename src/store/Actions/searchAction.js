import axios from 'axios';
import { host } from '../../config/config';

export const fetchSearch = async (index, page, limit) => {
    let req = await axios.post(host + 'search/' + index + '?p=' + (page ? page : 1) + '&limit=' + (limit ? limit : 6))
    return req.data
}

export const searchDispatch = async (setData, { index, page, limit }) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const data = await fetchSearch(index, page, limit)
        setData(s => ({ ...s, data, loading: false, error: false }))
    }
    catch (err) {
        setData(s => ({ ...s, error: true, loading: false }))
    }
}