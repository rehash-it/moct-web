export const getHeaders = () => {
    const headers = sessionStorage.getItem('x-auth-token')
    return {
        headers: {
            'x-auth-token': headers
        }
    }
}
export const getData = (data) => {
    let value = {}
    for (var i in data)
        value[i] = data[i].value

    return value
}