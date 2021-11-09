export const GoogleSignin = response => {
    const { tokenId, profileObj } = response
    const { name: username, email } = profileObj
    return { username, email, account_type: 'google', isAdmin: false, isActive: true }
}
export const FbLogin = response => {
    const { name: username, email, accessToken: token } = response
    return { username, email, account_type: 'fb', isAdmin: false, isActive: true }
}