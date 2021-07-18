import axios from "axios"
import { host } from "../../config/config"
/** 
 * @param {*} region -region of the country 'Amhara' ||'oromia'.......
 * @param {*} page - page number for pagination
 * @param {*} limit- limit value 
 * @returns returns array of objects from the servers 
 */
export const fetchSites = async (region, page, limit) => {
    //localhost:9000/api/site?region=amhara&page=1&limit=9
    const Url = region !== 'All' ? (host + 'site?region=' + region + '&page=' + page + '&limit=' + (limit ? limit : 8)) :
        (host + 'site?page=' + page + '&limit=' + (limit ? limit : 12))
    const fetch = await axios.get(Url)
    return fetch.data
}
/**
 * @param {*} setData- useState function for convering the state 
 * @param {*} region -region of the country 'Amhara' ||'oromia'.......
 * @param {*} page - page number for pagination
 * @param {*} limit- limit value 
 * @returns returns array of objects from the servers 
 */
export const sitesDispatch = async (setData, { region, page, limit }) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const Data = await fetchSites(region, page, limit)
        setData(s => ({ ...s, data: Data[0], loading: false, error: false, length: Data[1] }))
    }
    catch (err) {
        console.log(err)
        setData(s => ({ ...s, error: true, loading: false }))
    }
}