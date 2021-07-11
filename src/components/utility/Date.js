import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons"

export const tellDay = (DATE) => {
    let day = new Date(DATE)
    return {
        date: day.getDate(),
        month: day.toUTCString().slice(8, 11),
        year: day.getFullYear()
    }
}
export const tellDate = DATE => new Date(DATE).toUTCString().slice(0, 17)