import axios from "axios"
import { fb_Rss, host, twitter_Rss } from "../../../config/config"
import { Donothing } from "../comments/action"

export const fecthArchives = async (setState) => {
    try {
        setState(s => ({ ...s, loading: true }))
        const req = await axios.get(host + 'archives')
        const data = req.data
        setState(s => ({ ...s, data, loading: false, error: false }))
    }
    catch (err) {
        console.log(err)
        setState(s => ({ ...s, loading: false, error: true }))
    }
}
export const newArchives = async (setState) => {
    try {
        const req = await axios.get(host + 'archives')
        const Req = await axios.get(fb_Rss)
        const REQ = await axios.get(twitter_Rss)
        const archives = req.data
        const fbFeed = Req.data.items[0].enclosure ? Req.data.items.map(f => { return { ...f, from: 'fb' } }) : []
        const twitterFeed = REQ.data.items[0].enclosure ? REQ.data.items.map(t => { return { ...t, from: 'twitter' } }) : []
        const socialFeed = [...fbFeed, ...twitterFeed]
        let newArchives = []
        socialFeed.forEach(s => {
            let archive = archives.find(a => s.id === a.id && a.title === s.title && a.from === s.from)
            console.log(!archive ? s : '')
            !archive ? newArchives.push(s) : Donothing()
        })
        setState(s => ({ ...s, data: newArchives, loading: false, error: false }))
    }
    catch (err) {
        console.log(err)
        setState(s => ({ ...s, loading: false, error: true }))
    }
}
export const saveArchives = async (saveProcess, fetchNew, fetchSaved) => {
    try {
        saveProcess(s => ({ ...s, process: 'saving...' }))
        const saveArchives = await axios.post(host + '/archives')
        if (saveArchives.status === 200) {
            saveProcess(s => ({ ...s, process: '', success: 'saved successfully!', error: '' }))
            fetchNew()
            fetchSaved()
            setTimeout(() => saveProcess(s => ({ ...s, process: '', success: '', error: '' })), 1000)
        }
    }
    catch (err) {
        console.log(err)
        saveProcess(s => ({ ...s, process: '', error: 'internal server error', success: '' }))
    }
}