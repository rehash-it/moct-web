import { converterDateTime } from 'ethiopian-calendar-date-converter'
import { getLanguage } from '../../translation/i18n'
export const tellDay = (DATE) => {
    let day = new Date(DATE)
    return {
        date: day.getDate(),
        month: day.toUTCString().slice(8, 11),
        year: day.getFullYear()
    }
}
export const tellDate = DATE => getLanguage() === 'amh' ?
    (ToEthiopianDateSting(DATE)) : (new Date(DATE).toUTCString().slice(0, 17))


/**converts gregorian calander to ethiopian date string */
export const ToEthiopianDateSting = (DATE) => {
    const date = new Date(DATE)
    const day = parseInt(date.getUTCDay())
    const ken = day === 1 ? 'ሰኞ' : day === 2 ? 'ማክሰኞ' : day === 3 ? 'ረቡዕ' : day === 4 ? 'ሐሙስ' :
        day === 5 ? 'አርብ' : day === 6 ? 'ቅዳሜ' : day === 7 ? 'እሁድ' : ''
    const Month = parseInt(converterDateTime.toEthiopian(date).month)
    const DAte = parseInt(converterDateTime.toEthiopian(date).date)
    const { year } = converterDateTime.toEthiopian(date)
    const month = Month === 1 ? 'መስከረም' : Month === 2 ? 'ጥቅምት' : Month === 3 ? 'ህዳር' : Month === 4 ? 'ታህሳስ' :
        Month === 5 ? 'ጥር' : Month === 6 ? 'የካቲት' : Month === 7 ? 'መጋቢት' : Month === 8 ? 'ሚያዝያ' : Month === 9 ? 'ግንቦት' :
            Month === 10 ? 'ሰኔ' : Month === 11 ? 'ሐምሌ' : Month === 12 ? 'ነሐሴ' : Month === 13 ? 'ጳጉሜ' : ''
    return ken + ' ' + DAte + ' ' + month + ' ' + year
}
export const dateFormat = (DATE) => {
    let day = new Date(DATE)
    return day.toISOString().split("T")[0]
}
/**returns a string of local time formatted like this (11:00 am)  */
export const localTime = DATE => {
    const date = new Date(DATE)
    const time = date.toLocaleTimeString()
    const t = time.split(':')
    const local = t[2].split(' ')
    return t[0] + ':' + t[1] + ' ' + (local[1] ? local[1] : '')
}
export const DateNow = () => {
    var currentdate = new Date();
    var datetime = (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear() + "-"
        + currentdate.getDate()
    return new Date().toISOString().split("T")[0]
}
