import axios from 'axios'
import { host } from '../../../config/config';
import { getHeaders } from '../../../config/headers';
export const GoogleSignin = response => {
    const { tokenId, profileObj } = response
    const { email } = profileObj
    return { username: email, account_type: 'google', isAdmin: false, isActive: true }
}
export const FbLogin = response => {
    const { email, accessToken: token } = response
    return { username: email, account_type: 'fb', isAdmin: false, isActive: true }
}
export const onFailure = (setProcess, media) => setProcess(s =>
    ({ ...s, message: 'can not login with ' + media + ' please try again', error: true, success: false, process: false }))
/**
 * 
 * @param {*} user =object contain username,email,password
 * @param {*} setProcess 
 */
export const loginUser = async (user, setProcess, type) => {
    try {
        setProcess(s => ({ ...s, process: 'logging in...' }))
        const req = await axios.post(host + type ? type : 'login', user, { ...getHeaders() })
        if (req.status === 200) {
            const res = req.data
            sessionStorage.setItem('x-auth-token', res.token)
            sessionStorage.setItem('id', res.id)
            sessionStorage.setItem('username', res.username)
            localStorage.setItem('chatname', res.username)
            localStorage.setItem('user_id', res.id)
            setProcess(s => ({ ...s, process: '', error: '', success: 'Welocme' }))
        }
    }
    catch (e) {
        console.log(err)
        const error = e.response ? e.response.data.message : 'internal server error'
        setProcess(s => ({ ...s, process: '', error, success: '' }))
    }
}
