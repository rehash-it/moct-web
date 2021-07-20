export const Logout = (push) => {
    sessionStorage.removeItem('x-auth-token')
    setTimeout(() => push('/'), 1000)
}