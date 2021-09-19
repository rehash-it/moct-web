import axios from 'axios'
import { host } from '../../config/config'
import { getHeaders } from './../../config/headers';
/**
 * fetch data from the serverver 
 * @param {*} page- page 1 or 2 or 3
 * @param {*} limit- limit data during fetching
 * @returns 
 */
export const fetchDatas = async (page, limit, url, admin) => {
    //localhost:9000/api/docs?page=1&limit=9
    const Url = host + url + '?page=' + page + '&limit=' + (limit ? limit : 8)
    const fetch = await axios.get(Url, getHeaders(admin))
    return fetch.data
}
export const fetchData = async (page, id) => {
    const url = host + page + '/' + id
    const fetch = await axios.get(url)
    return fetch.data
}
/**
 * 
 * @param {*} setData- function that set the state the data must contain an object of{loading,error,data,length}
 * @param {*} param1 - page and limit pf the page display
 */
export const datasDispatch = async (setData, { page, limit, url, admin }) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const Data = await fetchDatas(page, limit, url, admin)
        setData(s => ({
            ...s, data: url !== 'user' ? Data[0] : Data,
            loading: false, error: false,
            length: url !== 'user' ? Data[1] : Data.length
        }))
    }
    catch (err) {
        console.log(err)
        setData(s => ({ ...s, error: true, loading: false }))
    }
}
export const dataDispatch = async (setData, { page, id }) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const data = await fetchData(page, id)
        setData(s => ({ ...s, data, loading: false, error: false }))
    }
    catch (err) {
        console.log(err)
        setData(s => ({ ...s, error: true, loading: false }))
    }
}
