
export class newsClass {
    constructor(news) {
        this.news = news
    }
    /**finds news and returns it's object property
     * @param {*} id -news id 
     * @returns news object
     */
    getNews = (id) => this.news.find(n => n._id === id)
}