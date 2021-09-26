import axios from "axios"

export const rssFeed = async (setFeed) => {
    try {
        setFeed({ error: false, loading: true, data: [] })
        const fetch = await axios.get('https://rss.app/feeds/lzMHjcsrdZXEH8P6.json');
        setFeed({ error: false, loading: false, data: fetch.data.items })
    }
    catch (err) {
        console.log(err)
        setFeed({ loading: false, data: [], error: true })
    }
}