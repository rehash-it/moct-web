import axios from 'axios'
import { host } from '../../config/config'
export const fetchNews = async (page) => {
    const fetch = await axios.get(host + 'news?page=' + page + '&limit=4')
    return fetch.data
}
export const addNews = (NEWS) => {
    return {
        type: 'ADD_NEWS', payload: NEWS
    }
}
export const loadingNews = () => {
    return {
        type: 'LOADING_NEWS'
    }
}
export const newsDispatch = async (dispatchNews, page) => {
    try {

        dispatchNews(loadingNews())
        const news = await fetchNews(page)
        dispatchNews(addNews(news))
    }
    catch (err) {
        console.log(err)
        dispatchNews({ type: 'error' })
    }
}