export const pageCalculate = (pageLimit, datalength) =>
    (Math.floor(datalength / pageLimit)) === (datalength / pageLimit) ?
        (datalength / pageLimit) : Math.floor(datalength / pageLimit) + 1
export const Scroll = (view) => {
    var top = document.getElementById(view)
    top.scrollIntoView({ behavior: 'auto' })
}
/**
 * 
 * @param {*} data 
 */
export const Disperse = (data) => {
    let value = {}
    for (var i in data) {

    }
}