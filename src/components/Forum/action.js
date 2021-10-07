import axios from "axios"
import { host } from "../../config/config"

export const getForum = async (id, setData) => {
    try {
        setData(s => ({ ...s, loading: true }))
        const req = await axios.get(host + 'forum/' + id)
        setData(s => ({ ...s, loading: false, data: req.data }))
    }
    catch (err) {
        console.log(err)
        setData(s => ({ ...s, loading: false, error: true }))
    }
}