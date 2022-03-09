import axios from "axios"
import { host } from "../../../config/config"
import { getHeaders } from "../../../config/headers"
import { removeDuplicates } from "../../../utility/array"
export const getForums = async (setData, type) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const req = await axios.get(host + 'forum', { headers: { status: type } })
        setData(s => ({ ...s, loading: false, data: req.data, catagory: removeDuplicates(req.data, 'type') }))
    }
    catch (err) {
        setData(s => ({ ...s, loading: false, data: [], erro: true }))
    }
}
export const closeForum = async (setSave, Forum, setTab) => {
    try {
        setSave(s => ({ ...s, process: 'closing please wait...', error: '', success: '' }))
        let forum = {
            ...Forum,
            closed_at: Date.now(),
            status: 'closed'
        }
        const req = await axios.put(host + 'forum/' + Forum._id, forum, getHeaders())
        if (req.status === 200) {
            setSave(s => ({ ...s, process: '', error: '', success: 'closed successfully!' }))
            setTab('past')
        }
    }
    catch (err) {
        console.log(err)
        setSave(s => ({ ...s, process: '', error: 'can not close the forum internal server error', success: '' }))
    }
}
export const getComments = async (forum_id) => {
    try {
        const comments = await axios.get(host + 'comment/' + forum_id, getHeaders())
        return comments.data
    }
    catch (err) {
        console.log(err)
    }
}
