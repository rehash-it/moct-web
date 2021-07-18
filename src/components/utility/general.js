export const pageCalculate = (pageLimit, datalength) =>
    (Math.floor(datalength / pageLimit)) === (datalength / pageLimit) ?
        (datalength / pageLimit) : Math.floor(datalength / pageLimit) + 1
export const Scroll = (view) => {
    var top = document.getElementById(view)
    top.scrollIntoView({ behavior: 'auto' })
}
export const randomID = () => Math.round(Math.random(0, 100000000) * 100000000)