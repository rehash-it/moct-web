import axios from "axios"
import { fb_Rss, twitter_Rss } from "../../config/config";

export const fbRssFeed = async (setFeed) => {
    try {
        setFeed({ error: false, loading: true, data: [] })
        const fetch = await axios.get(fb_Rss);
        let data = fetch.data.items
        let url = data[0].enclosure
        setFeed({ error: false, loading: false, data: url ? data : [] })
    }
    catch (err) {
        console.log(err)
        setFeed({ loading: false, data: [], error: true })
    }
}
export const twitterFeed = async (setFeed) => {
    try {
        setFeed({ error: false, loading: true, data: [] })
        const fetch = await axios.get(twitter_Rss);
        let data = fetch.data.items
        let url = data[0].enclosure
        setFeed({ error: false, loading: false, data: url ? data : [] })
    }
    catch (err) {
        console.log(err)
        setFeed({ loading: false, data: [], error: true })
    }
}