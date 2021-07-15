/** it disperrse the adata in {title:{value:'',}}
 * @param {*} data 
 */
export const Disperse = (data) => {
    let value = {}
    for (var i in data) {
        value[i] = { value: data[i], active: 'Active' }
    }
    return value
}
/**- removes item from the object 
 * @param {*} data-object data 
 * @param {*} id-remove item
 * @returns 
 */
export const removeItem = (data, id) => {
    let value = {}
    for (var i in data) {
        if (i !== (id ? id : '_id')) {
            value[i] = data[i]
        }
    }

    return value
}