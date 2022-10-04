export const Logout = (push) => {
    sessionStorage.removeItem('x-auth-token')
    setTimeout(() => push('/login'), 1000)
}